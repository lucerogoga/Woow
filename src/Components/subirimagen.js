// import * as React from "react";
// import {
//   Button,
//   IconButton,
//   Tooltip,
//   makeStyles,
//   Theme,
// } from "@material-ui/core";
// import { PhotoCamera } from "@material-ui/icons";

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: "none",
//   },
//   faceImage: {
//     color: theme.palette.primary.light,
//   },
// }));

// interface FormProps {
//   saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
// }

// export const FaceForm: React.FunctionComponent<FormProps> = ({ saveFace }) => {
//   const classes = useStyles();
//   const [selectedFile, setSelectedFile] = React.useState(null);

//   const handleCapture = ({ target }: any) => {
//     setSelectedFile(target.files[0]);
//   };

//   const handleSubmit = () => {
//     saveFace(selectedFile);
//   };

//   return (
//     <>
//       <input
//         accept="image/jpeg"
//         className={classes.input}
//         id="faceImage"
//         type="file"
//         onChange={handleCapture}
//       />
//       <Tooltip title="Select Image">
//         <label htmlFor="faceImage">
//           <IconButton
//             className={classes.faceImage}
//             color="primary"
//             aria-label="upload picture"
//             component="span"
//           >
//             <PhotoCamera fontSize="large" />
//           </IconButton>
//         </label>
//       </Tooltip>
//       <label>{selectedFile ? selectedFile.name : "Select Image"}</label>. . .
//       <Button onClick={() => handleSubmit()} color="primary">
//         Save
//       </Button>
//     </>
//   );
// };
