import { getCall } from "./apiUtils";
import { BASE_URI } from "./enums";

export const getStudentImageData = async () => {
  const data = await getCall(BASE_URI);

  return data.data[0];
};
