import axios from "../axiosConfig";

export const apiGetFavoritesByUserId = (userId) => {
  return axios.get(`api/v1/favorite/all?userId=${userId}`);
};

export const apiAddFavorite = (userId, postId) => {
  return axios.post(`api/v1/favorite/create`, { userId, postId });
};

export const apiRemoveFavorite = (userId, postId) => {
  return axios.delete(
    `api/v1/favorite/delete?userId=${userId}&postId=${postId}`
  );
};
