import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { loadModels } from "../../utils/loadedModels";
import { getStudentDespData } from "../../utils/fetchData";

import AppBar from "../../components/AppBar";
import ImageCard from "../../components/ImageCard";
import BackDrop from "../../components/BackDrop";

const HomePage = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [backDropText, setBackDropText] = useState("Preparing System...");

  const studentData = useRef([]);

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
    setShowBackDrop(true);

    loadModels().then(() => {
      setBackDropText("Loading Database...");
      getStudentDespData()
        .then(async (value) => {
          studentData.current = await value;
        })
        .then(() => setShowBackDrop(false));
    });
  }, []);

  return (
    <div id="root-container">
      <AppBar isWeb={!isMobile()} />
      <ImageCard labelKey="upload" isWeb={!isMobile()} studentData={studentData.current} />

      {showBackDrop && <BackDrop title={backDropText} />}
    </div>
  );
};

export default HomePage;
