import React, { useEffect } from "react";

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
      <div className="image-container">
        <ImageCard labelKey="upload" />
      </div>

      <div className="attendance-list">
        <ol className="records"></ol>
      </div>
    </div>
  );
};

export default HomePage;
