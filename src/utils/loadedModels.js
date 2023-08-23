import * as faceapi from "face-api.js";

export const loadModels = async () => {
  const modelsPath = process.env.PUBLIC_URL + "/models";

  await Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri(modelsPath),
    faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath),
    faceapi.nets.ssdMobilenetv1.loadFromUri(modelsPath),
  ]);
};
