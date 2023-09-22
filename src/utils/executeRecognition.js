import {
  createCanvas,
  FaceMatcher,
  matchDimensions,
  detectAllFaces,
  SsdMobilenetv1Options,
  resizeResults,
  draw,
  bufferToImage
} from "face-api.js";

import { DrawBoxOptions } from "face-api.js/build/commonjs/draw";

import dummyImage from '../assets/images/Team/ShubhLaad.jpg';

let image;
let canvas;

const generateBlob = async () => {
  console.log(document);
  const img = document.body.children[1].innerHTML;
  console.log(img);
  img.src = "https://www.seekpng.com/png/full/60-604032_face-businessman-png-dummy-images-for-testimonials.png";
  console.log(img);

  await detectAllFaces(img, new SsdMobilenetv1Options({ minConfidence: 0.35 }))
    .withFaceLandmarks()
    .withFaceDescriptors();
};

generateBlob();

export const executeRecognition = async (bufferData, index, studentDataRcvd, hashMap, dimensions, isWeb) => {
  const studentData = studentDataRcvd;

  image = bufferData;
  canvas = createCanvas(image);

  const refWidth = isWeb ? dimensions.width / 1.91 : dimensions.width;
  const factor = image.width / image.height;
  const refHeight = refWidth / factor;

  const useWidth = Math.ceil(refWidth * 0.97);
  const useHeight = Math.ceil(refHeight * 0.97);

  const displaySize = {
    width: useWidth,
    height: useHeight,
  };
  matchDimensions(canvas, displaySize);

  const start = Date.now();
  console.log(image.src);
  const detections = await detectAllFaces(image, new SsdMobilenetv1Options({ minConfidence: 0.35 }))
    .withFaceLandmarks()
    .withFaceDescriptors();
  console.log("BufferTime: ", Date.now()-start);
  const resizeDetections = resizeResults(detections, displaySize);
  const results = resizeDetections.map((d) => new FaceMatcher(studentData, 0.51).findBestMatch(d.descriptor));
  
  const markAttendance = (name) => {
    let num = hashMap.get(name);
    num++;
    hashMap.set(name, num);
  };

  results.forEach((student) => {
    if (student.label !== "unknown") {
      if (hashMap.has(student.label) && hashMap.get(student.label) === 0) {
        markAttendance(student.label);
      }
    } else {
      markAttendance("unknown");
    }
  });

  results.forEach((result, i) => {
    const box = resizeDetections[i].detection.box;
    const options = new DrawBoxOptions();

    if (result.label === "unknown") options.boxColor = "red";

    const drawBox = new draw.DrawBox(box, options);
    drawBox.draw(canvas);
  });
  document.querySelector(`#holder${index}`).appendChild(canvas);

  canvas.style.position = "absolute";
  canvas.style.top = "0";
};
