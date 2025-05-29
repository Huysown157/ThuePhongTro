import axios from "../axiosConfig";
import axiosDefault from "axios";

export const apiGetPriceRanges = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "api/v1/price-range/all",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdatePriceRange = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: "api/v1/price-range/update",
        data: payload,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiAddPriceRange = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "api/v1/price-range/create",
        data: payload,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiDeletePriceRange = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "delete",
        url: `api/v1/price-range/delete/${id}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apigetAreaRanges = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "api/v1/area-range/all",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateAreaRange = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "put",
        url: "api/v1/area-range/update",
        data: payload,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiAddAreaRange = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "post",
        url: "api/v1/area-range/create",
        data: payload,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiDeleteAreaRange = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "delete",
        url: `api/v1/area-range/delete/${id}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiGetProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "api/v1/province/all",
      });
      // console.log(response);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicProvinces = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: "https://vapi.vnappmob.com/api/v2/province/",
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicDistricts = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://vapi.vnappmob.com/api/v2/province/district/${provinceId}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetPublicWards = (districtId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://vapi.vnappmob.com/api/v2/province/ward/${districtId}`,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
