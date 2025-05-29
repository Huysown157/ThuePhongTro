import axiosConfig from "../axiosConfig";

export const apiGetCurrentUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "api/v1/user/get-current",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//GET ALL USER
export const apiGetUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "api/v1/user/all",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiUpdateUser = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "api/v1/user/update",
        data: payload,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiDeleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "delete",
        url: `api/v1/user/delete/${id}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
