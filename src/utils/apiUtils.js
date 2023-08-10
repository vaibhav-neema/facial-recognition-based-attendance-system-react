import axios from "axios";

export const getCall = async (url) => {
  const response = await axios.get(url);
  return response;
};
