import React from "react";
import PropTypes from "prop-types";

import Logo from "../Logo";
import RefreshIcon from "../RefreshIcon";

import "./index.scss";

const AppBar = ({ title, subTitle }) => {
  return (
    <div className="app-bar">
      <Logo />

      <div className="content">
        <div className="title">{title}</div>
        <div className="sub-title">{subTitle}</div>
      </div>

      <RefreshIcon />
    </div>
  );
};

AppBar.defaultProps = {
  title: "Smart Attendance Portal",
  subTitle: `IET-DAVV \u00A0 E&TC`,
};

AppBar.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

export default AppBar;
