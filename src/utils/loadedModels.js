import * as faceapi from "face-api.js";
import { detectAllFaces, SsdMobilenetv1Options } from "face-api.js";

import dummyImage from "../assets/images/dummy-face.jpg";

const generateBlob = async () => {
  let base_image = new Image();
  base_image.src = dummyImage;

  await detectAllFaces(base_image, new SsdMobilenetv1Options({ minConfidence: 0.35 }))
    .withFaceLandmarks()
    .withFaceDescriptors();
};

export const loadModels = async () => {
  const modelsPath = process.env.PUBLIC_URL + "/models";

  await Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri(modelsPath),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath),
    faceapi.nets.ssdMobilenetv1.loadFromUri(modelsPath),
  ]).then(() => {
    generateBlob();
  });
};
