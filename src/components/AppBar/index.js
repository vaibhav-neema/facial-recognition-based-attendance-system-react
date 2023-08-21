import React from "react";
import PropTypes from "prop-types";

import Logo from "../Logo";
import RefreshIcon from "../RefreshIcon";

import "./index.scss";

const AppBar = ({ title, subTitle }) => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="app-bar">
      <Logo />

      <div className="app-bar-content">
        <div className="title">{title}</div>
        <div className="sub-title">{subTitle}</div>
      </div>

      <RefreshIcon onClickHandler={reloadPage} />
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

export default React.memo(AppBar);
