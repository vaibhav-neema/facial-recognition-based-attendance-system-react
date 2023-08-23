import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { loadModels } from "../../utils/loadedModels";

import AppBar from "../../components/AppBar";
import ImageCard from "../../components/ImageCard";

const HomePage = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const updateDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    setWindowWidth(width);
    setWindowHeight(height);
  };

  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/home");
    }

    if (!authToken) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  });

  const isMobile = () => {
    if (windowWidth <= windowHeight / 1.5) return true;
  };

  useEffect(() => {
    // load the models when homePage mounts
    loadModels();
  }, []);

  return (
    <div id="root-container">
      <AppBar isWeb={!isMobile()} />
      <ImageCard labelKey="upload" isWeb={!isMobile()} />
    </div>
  );
};

export default HomePage;
