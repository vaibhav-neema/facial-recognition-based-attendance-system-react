import React from "react";
import PropTypes from "prop-types";

import Loader from "../Loader";
import logo from "../../assets/images/davvlogo.png";

import "./index.scss";

const BackDrop = ({ title }) => {
  return (
    <div className="backdrop">
      <img src={logo} alt="loader-logo" />
      <Loader />
      {title && <p>{title}</p>}
    </div>
  );
};

BackDrop.defaultProps = {
  title: "",
};

BackDrop.propTypes = {
  title: PropTypes.string,
};

export default BackDrop;
