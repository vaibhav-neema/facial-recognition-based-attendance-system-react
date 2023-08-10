import { fetchImage, detectSingleFace, LabeledFaceDescriptors } from "face-api.js";
import { getStudentImageData } from "./fetchData";

export const getStudentData = async () => {
  const studentData = await getStudentImageData();
  const imageData = studentData?.iet_davv_data?.b23?.ETC?.B;

  return Promise.all(
    imageData.map(async (student) => {
      const descriptions = [];
      const studentName = student.name;

      for (let i = 1; i <= 1; i++) {
        const img = await fetchImage(student.imageUrl);
        const detections = await detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }

      return new LabeledFaceDescriptors(studentName, descriptions);
    })
  );
};
