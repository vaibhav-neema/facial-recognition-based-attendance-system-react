import React, { useEffect, useState, useRef } from "react";

import { loadModels } from "../../utils/loadedModels";

import AppBar from "../../components/AppBar";
import ImageCard from "../../components/ImageCard";
import Separator from "../../components/Separator";

import "./index.scss";

const HomePage = () => {
  useEffect(() => {
    // load the models when homePage mounts
    loadModels();
  }, []);

  return (
    <div id="root-container">
      <AppBar />
      <Separator />
      <ImageCard labelKey="upload" />
    </div>
  );
};

export default HomePage;
