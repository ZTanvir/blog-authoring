import axiosApi from "./axiosApi";

const getPosts = async (url) => {
  const response = await axiosApi.get(url);
  return response.data;
};

export default { getPosts };
