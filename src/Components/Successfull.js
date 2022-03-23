import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";

export default function Success({ estado, loading }) {
  const [success, setSuccess] = useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: "#ff9aa3",
      color: "#fff",
      "&:hover": {
        bgcolor: "#ff9aa3",
        color: "#fff",
      },
    }),
  };

  useEffect(() => {
    if (!loading) {
      setSuccess(true);
    }
  }, [loading]);

  return (
    <Box
      sx={{
        display: estado,
        alignItems: "center",
        justifyContent: "center",
        height: "65vh",
      }}
    >
      <Box sx={{ l: 1, position: "relative" }}>
        <Fab sx={buttonSx}>{success ? <CheckIcon /> : null}</Fab>
        {loading && (
          <CircularProgress
            size={68}
            sx={{
              color: "#ff9aa3",
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
}
