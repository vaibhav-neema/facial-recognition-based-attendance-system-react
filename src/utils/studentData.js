import { IKCore } from "imagekitio-react";
import { fetchImage, detectSingleFace, LabeledFaceDescriptors } from "face-api.js";

const students = [
  "18T8121_Ekta%20Bara",
  "19T8104_Abhishek%20Thakur",
  "19T8105_Aditya%20Singh%20Dangi",
  "19T8109_Antriksh%20Tyagi",
  "19T8110_Anubhav%20Chahar",
  "19T8112_Ayush%20Agrawal",
  "19T8114_Bhumika%20Modh",
  "19T8117_Deepesh%20Aswani",
  "19T8118_Divyanshu%20Parwal",
  "19T8121_Gourav%20Dehariya",
  "19T8122_Hitesh%20Mani",
  "19T8127_Kushagra%20Bandil",
  "19T8132_Mihir%20Jain",
  "19T8137_Pranjal%20Sahu",
  "19T8138_Pranshu%20Jain",
  "19T8139_Prashant%20Bairagi",
  "19T8142_Priyanshu%20Khare",
  "19T8144_Rajat%20Hotwani",
  "19T8149_Sanidhya%20Pal",
  "19T8153_Shakti%20Aggarwal",
  "19T8154_Shraddha%20Soni",
  "19T8156_Shubh%20Laad",
  "19T8157_Siddhant%20Jain",
  "19T8158_Sumiran%20Jaiswal",
  "19T8163_Urvish%20Jain",
  "19T8164_Utkarsh%20Gupte",
  "19T8167_Vishal%20Yadav",
  "19T8170_Yogesh%20Jadon",
  "19T8171_Yuvraj%20Singh%20Shaktawat",
  "19T8172_Hussain%20Barwahwala",
  "19T8184_Nayan%20Bargal",
  "20T8182_Jayesh%20Mulchandani",
  "20T8184_Nisha%20Chilgar",
  "Dr.%20Vaibhav%20Neema",
];

const imagekit = new IKCore({
  publicKey: "public_FxlsYD1M3pVnBXPzpcIyv69a39Q=",
  privateKey: "private_vLV1xYiTtDj2e6OvgHE8JItm4og=",
  urlEndpoint: "https://ik.imagekit.io/ietdavvImageData",
});

export const getStudentData = () => {
  return Promise.all(
    students.map(async (student) => {
      const descriptions = [];
      const studentUrlName = student.replace("T8", "T7");
      const studentName = student.replaceAll("%20", " ");

      const imageURL = imagekit.url({
        path: `/IETDAVV/Batch-2023/ETC/Section-B/${studentUrlName}.jpg`,
        urlEndpoint: "https://ik.imagekit.io/ietdavvImageData/",
      });

      for (let i = 1; i <= 1; i++) {
        const img = await fetchImage(imageURL);
        const detections = await detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
      }

      return new LabeledFaceDescriptors(studentName, descriptions);
    })
  );
};
