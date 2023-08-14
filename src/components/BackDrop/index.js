import React from "react";

import logo from "../../assets/images/davvlogo.png";

import "./index.scss";

const BackDrop = () => {
  return (
    <div className="backdrop">
      <img src={logo} alt="loader-logo" />
      <p>Loading Database...</p>
    </div>
  );
};

export default BackDrop;
