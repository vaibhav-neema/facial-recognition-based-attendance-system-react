import React from "react";
import PropTypes from "prop-types";

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

const ResponsiveAppBar = ({ onClickHandle }) => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ background: "#1b5e20" }}>
        <Box width={"100%"} height={"10vh"} display={"flex"} alignContent={"center"}>
          <Toolbar
            disableGutters
            sx={{ position: "relative", width: "100%", display: "flex", justifyContent: "space-between" }}
          >
            <Typography marginLeft={"1rem"}>AllIn</Typography>

            <button
              style={{ backgroundColor: "transparent", border: 0, color: "white", marginRight: "1.5%" }}
              onClick={onClickHandle}
            >
              <i className="material-icons">people</i>
            </button>
          </Toolbar>
        </Box>
      </AppBar>
    </ThemeProvider>
  );
};

ResponsiveAppBar.defaultProps = {
  onClickHandle: () => {},
};

ResponsiveAppBar.propTypes = {
  onClickHandle: PropTypes.func,
};

export default ResponsiveAppBar;
