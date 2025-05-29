import * as apis from "../../services";
import actionTypes from "./actionType";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCategories();
    // console.log(response);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        categories: response.data.response,
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        msg: response.data.msg,
        categories: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORIES,
      categories: null,
      msg: error,
    });
  }
};

export const getPriceRanges = () => async (dispatch) => {
  try {
    const response = await apis.apiGetPriceRanges();
    // console.log(response);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_PRICE_RANGES,
        priceRanges: response.data.response.sort((a, b) => {
          return +a.order - +b.order;
        }),
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRICE_RANGES,
        msg: response.data.msg,
        priceRanges: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRICE_RANGES,
      priceRanges: null,
      msg: error,
    });
  }
};

export const getAreaRanges = () => async (dispatch) => {
  try {
    const response = await apis.apigetAreaRanges();
    // console.log(response);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_AREA_RANGES,
        areaRanges: response.data.response.sort((a, b) => {
          return +a.order - +b.order;
        }),
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_AREA_RANGES,
        msg: response.data.msg,
        areaRanges: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_AREA_RANGES,
      areaRanges: null,
      msg: error,
    });
  }
};

export const getProvinces = () => async (dispatch) => {
  try {
    const response = await apis.apiGetProvinces();
    // console.log(response);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_PROVINCES,
        provinces: response.data.response,
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_PROVINCES,
        msg: response.data.msg,
        provinces: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PROVINCES,
      provinces: null,
      msg: error,
    });
  }
};
