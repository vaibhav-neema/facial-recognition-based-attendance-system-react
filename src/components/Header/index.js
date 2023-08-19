import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Geologica",
    fontSize: 20,
  },
});

const ResponsiveAppBar = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ background: "#1b5e20" }}>
        <Box width={"100%"} height={"10vh"} display={"flex"} alignContent={"center"} justifyContent={"flex-start"}>
          <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography marginLeft={"1rem"}>FaceIn</Typography>
          </Toolbar>
        </Box>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
