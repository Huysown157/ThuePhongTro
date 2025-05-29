import actionTypes from "../actions/actionType";

const initState = {
  msg: "",
  categories: [],
  priceRanges: [],
  areaRanges: [],
  provinces: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.categories || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_PRICE_RANGES:
      return {
        ...state,
        priceRanges: action.priceRanges || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_AREA_RANGES:
      return {
        ...state,
        areaRanges: action.areaRanges || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_PROVINCES:
      return {
        ...state,
        provinces: action.provinces || [],
        msg: action.msg || "",
      };

    default:
      return state;
  }
};
export default appReducer;
