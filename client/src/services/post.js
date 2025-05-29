import axiosConfig from "../axiosConfig";
import axios from "axios";

export const apiGetPosts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "api/v1/post/all",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiGetPostsLimit = (query) => {
  // console.log(query);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `api/v1/post/limit`,
        params: query,
      });
      // console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiGetNewPosts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `api/v1/post/new-post`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiCreatePost = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: `api/v1/post/create-post`,
        data: body,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//UPDATE POST
export const apiUpdatePost = (body) => {
  return new Promise(async (resolve, reject) => {
    // console.log(body);
    try {
      const response = await axiosConfig({
        method: "put",
        url: `api/v1/post/update`,
        data: body,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//DELETE POST
export const apiDeletePost = (id) => {
  return new Promise(async (resolve, reject) => {
    // console.log(id);
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `api/v1/post/delete`,
        data: { id },
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiUploadImages = (images) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data: images,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//GET POST BY USER ID
export const apiGetPostsLimitByUserId = (query) => {
  // console.log(query);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `api/v1/post/limit-by-user`,
        params: query,
      });
      // console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//GET POST BY ID
export const apiGetPostById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `api/v1/post/one/${id}`,
      });
      // console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
