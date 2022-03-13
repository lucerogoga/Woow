import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
        blue: "#283159",
        pink: "#ff9aa3",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });
  
export const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.white,
      color: theme.palette.primary.blue,
      fontWeight: 700,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: theme.palette.primary.blue,
    },
  }));

