import {
  bufferToImage,
  createCanvas,
  FaceMatcher,
  matchDimensions,
  detectAllFaces,
  SsdMobilenetv1Options,
  resizeResults,
  draw,
} from "face-api.js";

import { getStudentData } from "./studentData";

let image;
let canvas;
const sortedList = [];

export const executeRecognition = async (imageFile, index) => {
  while (sortedList.length !== 0) {
    sortedList.pop();
  }

  image = await bufferToImage(imageFile);
  canvas = createCanvas(image);

  const studentData = await getStudentData();

  const displaySize = {
    width: document.querySelectorAll(".frame-image")[index].width,
    height: document.querySelectorAll(".frame-image")[index].height,
  };
  matchDimensions(canvas, displaySize);

  const detections = await detectAllFaces(image, new SsdMobilenetv1Options({ minConfidence: 0.33 }))
    .withFaceLandmarks()
    .withFaceDescriptors();
  const resizeDetections = resizeResults(detections, displaySize);
  const results = resizeDetections.map((d) => new FaceMatcher(studentData, 0.53).findBestMatch(d.descriptor));

  results.forEach((student) => {
    sortedList.push(student.toString());
  });

  results.forEach((result, i) => {
    const box = resizeDetections[i].detection.box;
    const drawBox = new draw.DrawBox(box);
    drawBox.draw(canvas);
  });
  document.querySelector(`#holder${index}`).appendChild(canvas);

  canvas.style.position = "absolute";
  canvas.style.top = "0";

  sortedList.sort();

  for (let i = 0; i < sortedList.length; i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "record");
    li.appendChild(document.createTextNode(sortedList[i]));
    document.querySelector(".records").appendChild(li);
  }
};
