import axiosConfig from "../axiosConfig";

export const apiGetCategories = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "api/v1/category/all",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiUpdateCategory = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "api/v1/category/update",
        data: payload,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiAddCategory = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "api/v1/category/create",
        data: payload,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiDeleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `api/v1/category/delete/${id}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
