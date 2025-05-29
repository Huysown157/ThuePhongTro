import actionTypes from "../actions/actionType";

const initState = {
  currentUser: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser || {},
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        currentUser: {},
      };
    default:
      return state;
  }
};

export default userReducer;
