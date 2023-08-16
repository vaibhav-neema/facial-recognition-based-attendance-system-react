import React from "react";

import Loader from "../Loader";
import logo from "../../assets/images/davvlogo.png";

import "./index.scss";

const BackDrop = () => {
  return (
    <div className="backdrop">
      <img src={logo} alt="loader-logo" />
      <Loader />
      <p>Preparing System...</p>
    </div>
  );
};

export default BackDrop;
