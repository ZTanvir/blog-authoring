import axiosApi from "./axiosApi";

const getPosts = async (url) => {
  const response = await axiosApi.get(url);
  return response.data;
};

const editPosts = async (url, { arg }) => {
  const response = await axiosApi.put(url, arg);
  return response.data;
};

const createPosts = async (url, { arg }) => {
  try {
    const response = await axiosApi.post(url, arg);
    return response.data;
  } catch (error) {
    if (error?.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

const deletePosts = async (url, { arg }) => {
  try {
    const response = await axiosApi.delete(url, arg);
    return response.data;
  } catch (error) {
    if (error?.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export default { getPosts, editPosts, createPosts, deletePosts };
