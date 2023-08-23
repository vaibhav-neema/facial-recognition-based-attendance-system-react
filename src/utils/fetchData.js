import { getCall } from "./apiUtils";
import { BASE_URI } from "./enums";
import { LabeledFaceDescriptors } from "face-api.js";

export const getStudentDespData = async () => {
  let data = [];

  try {
    data = await getCall(BASE_URI);
    return data.data[0];
  } catch (error) {
    console.log(error);
  }

  return data;
};

export const filterData = (batch, branch, section, fetchedStudentData) => {
  const imageData = fetchedStudentData["iet_davv_data"][batch][branch][section];

  const lfdFormatArray = [];

  for (let i = 0; i < imageData.length; i++) {
    const label = imageData[i].label;
    const descriptor = Float32Array.from(imageData[i].descriptors[0]);
    const f32AFormat = [Float32Array.from(descriptor)];

    const lfd = new LabeledFaceDescriptors(label, f32AFormat);
    lfdFormatArray.push(lfd);
  }

  return lfdFormatArray;
};
