import { LabeledFaceDescriptors } from "face-api.js";
import { getStudentImageData } from "./fetchData";

export const getStudentData = async () => {
  const studentData = await getStudentImageData();
  const imageData = studentData?.iet_davv_data?.b23?.ETC?.B;
  const lfdFormatArray = [];

  for (let i = 0; i < imageData.length; i++) {
    const label = imageData[i].label;
    const descriptor = Float32Array.from(imageData[i].descriptors[0]);
    const f32AFormat = [Float32Array.from(descriptor)];

    const lfd = new LabeledFaceDescriptors(label, f32AFormat);
    lfdFormatArray.push(lfd);
  }

  return lfdFormatArray;

  // return Promise.all(
  //   imageData.map(async (student) => {
  //     const descriptions = [];
  //     const studentName = student.name;

  //     for (let i = 1; i <= 1; i++) {
  //       const img = await fetchImage(student.imageUrl);
  //       const detections = await detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
  //       descriptions.push(detections.descriptor);
  //     }

  //     const lfd = new LabeledFaceDescriptors(studentName, descriptions);
  //     return lfd;
  //   })
  // );
};
