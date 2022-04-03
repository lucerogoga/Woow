import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
//Material UI Components
import { Grid, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
//Components
import ErrorModal from "./ErrorModal";
import { ReactComponent as Spinner } from "../Assets/icons/Spinner.svg";
import ActionButton from "./ActionButton";
//Materiaul UI Icons
import PhotoCamera from "@mui/icons-material/PhotoCamera";
//Firebase Connection
import {
  getProductsCategories,
  createProductFirebase,
  uploadImage,
  editProductFirebase,
} from "../Services/FirestoreServices";

//Styles for Material UI
const Input = styled("input")({
  display: "none",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "2rem",
  boxShadow: 24,
  color: "#283159",
  p: 5,
};

export default function ModalProducts({ isOpen, onClose, productToEdit }) {
  const [productCategories, setProductCategories] = useState([]);
  useEffect(() => {
    getProductsCategories().then((category) => {
      category.shift();
      setProductCategories(category);
    });
  }, []);

  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productOption, setProductOption] = useState([null]);
  const [productPhoto, setProductPhoto] = useState([]);
  const [productStock, setProductStock] = useState("");
  const [objectURL, setObjectURL] = useState("");
  //states for error Message
  const [errorMessage, setErrorMessage] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const cleanForm = () => {
    setCategoryId("");
    setProductName("");
    setProductDescription("");
    setProductCost("");
    setProductStock("");
    setProductOption(null);
    setProductPhoto("");
    setObjectURL("");
  };
  useEffect(() => {
    setObjectURL("");
  }, []);

  useEffect(() => {
    if (productToEdit) {
      setCategoryId(productToEdit.cat_id);
      setProductName(productToEdit.product_name);
      setProductDescription(productToEdit.product_description);
      setProductCost(productToEdit.product_cost[0]);
      setProductStock(productToEdit.product_stock[0]);
      setProductOption(null);
      setProductPhoto(productToEdit.product_photo[0]);
      setObjectURL("");
    }
    return () => cleanForm();
  }, [productToEdit]);

  const [loading, setLoading] = useState(false);

  const createProduct = async () => {
    //first we validate the fields not to be empty
    //second we upload the image then we have the url and set in the new product
    if (
      productPhoto === "" ||
      productName === "" ||
      productDescription === "" ||
      productCategories === "" ||
      productCost === "" ||
      productStock === ""
    ) {
      setErrorMessage("All Fields must be filled");
      setDisplayError(true);
    } else {
      setLoading(true);

      const downloadUrl = await uploadImage(productPhoto, categoryId);
      createProductFirebase(
        categoryId,
        productName,
        productDescription,
        productCost,
        productOption,
        downloadUrl,
        productStock
      )
        .then((res) => {
          onClose();
        })
        .finally(() => {
          setLoading(false);
          clear();
        });
    }
  };

  const editProduct = async () => {
    setLoading(true);
    let downloadUrl;
    if (typeof productPhoto === "string") {
      downloadUrl = productPhoto;
    } else {
      downloadUrl = await uploadImage(productPhoto, categoryId);
    }
    editProductFirebase(
      productToEdit.id,
      categoryId,
      productName,
      productDescription,
      productCost,
      downloadUrl,
      productStock
    )
      .then(() => {
        onClose();
      })
      .finally(() => {
        setLoading(false);
        clear();
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setDisplayError(false);
    if (productToEdit) {
      editProduct();
    } else {
      createProduct();
    }
  };

  const onChange = (e) => {
    setProductPhoto(e.target.files[0]);
    setObjectURL(URL.createObjectURL(e.target.files[0]));
  };
  const handleChangeCategory = (e) => {
    setCategoryId(e.target.value);
  };
  const clear = () => {
    setProductName("");
    setProductDescription("");
    setProductCost("");
    setProductOption(null);
    setProductPhoto("");
    setProductStock("");
  };
  const handleDisplayError = () => {
    setDisplayError(false);
  };
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "70%" }}>
          <div className="error">
            <ErrorModal
              message={errorMessage}
              onClose={handleDisplayError}
              isVisible={displayError}
            />
          </div>
          <Grid
            container
            gap="1rem"
            marginTop="2rem"
            justifyContent="center"
            sx={{ minHeight: "508px" }}
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category Product
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryId}
                    label="Category Product"
                    onChange={handleChangeCategory}
                  >
                    {productCategories.map((cat, i) => {
                      return (
                        <MenuItem value={cat.cat_uid} key={cat.cat_uid}>
                          {cat.cat_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  required
                  label="Product Name"
                  value={productName}
                  variant="outlined"
                  autoComplete="off"
                  onChange={(e) => setProductName(e.target.value)}
                />
                <TextField
                  fullWidth
                  required
                  value={productDescription}
                  label="Description"
                  variant="outlined"
                  autoComplete="off"
                  onChange={(e) => setProductDescription(e.target.value)}
                />
                <TextField
                  fullWidth
                  required
                  value={productCost}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  label="Price"
                  variant="outlined"
                  autoComplete="off"
                  onChange={(e) => setProductCost(e.target.value)}
                />
                <TextField
                  fullWidth
                  required
                  value={productStock}
                  label="Stock"
                  variant="outlined"
                  autoComplete="off"
                  onChange={(e) => setProductStock(e.target.value)}
                />
                <TextField
                  fullWidth
                  required
                  disabled
                  label={productPhoto.name}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <label htmlFor="icon-button-file">
                          <Input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            required
                            onChange={onChange}
                          />
                          <IconButton
                            aria-label="upload picture"
                            component="span"
                          >
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </InputAdornment>
                    ),
                  }}
                  placeholder={productToEdit ? "Change Image" : "add Image *"}
                  variant="outlined"
                  autoComplete="off"
                  onChange={(e) => setProductPhoto(e.target.value)}
                />
                {productToEdit && typeof productPhoto === "string" ? (
                  <img src={productPhoto} alt={"photoProducta"} width="100px" />
                ) : null}

                {objectURL === "" ? null : (
                  <img src={objectURL} alt={"photoProductb"} width="100px" />
                )}
                <div className="large-button__content" onClick={handleSubmit}>
                  <ActionButton
                    title={productToEdit ? "Update Product" : "Create Product"}
                    className={"button--pink"}
                  />
                </div>
              </>
            )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
