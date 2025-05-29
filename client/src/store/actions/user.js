import * as apis from "../../services";
import actionTypes from "./actionType";

export const getCurrentUser = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCurrentUser();
    // console.log(response);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT_USER,
        currentUser: response.data.response,
        msg: "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT_USER,
        msg: response.data.msg,
        currentUser: null,
      });
      dispatch({ type: actionTypes.LOGOUT });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT_USER,
      currentUser: null,
      msg: error,
    });
    dispatch({ type: actionTypes.LOGOUT });
  }
};
