import axios from "axios";

export const getCall = async (url) => {
  let response = [];
  try {
    return await axios.get(url);
  } catch (error) {
    console.log(error);
  }

  return response;
};
