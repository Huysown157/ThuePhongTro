import actionTypes from "../actions/actionType";

const initState = {
  posts: [],
  msg: "",
  count: 0,
  newPosts: [],
  postsOfUser: [],
  dataEdit: {},
  favorites: [],
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
    case actionTypes.GET_POSTS_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.GET_NEW_POSTS:
      return {
        ...state,
        msg: action.msg || "",
        newPosts: action.newPosts || [],
      };
    case actionTypes.GET_POSTS_LIMIT_BY_USER_ID:
      return {
        ...state,
        msg: action.msg || "",
        postsOfUser: action.postsOfUser || [],
        count: action.count || 0,
      };
    case actionTypes.EDIT_DATA:
      return {
        ...state,
        dataEdit: action.dataEdit || {},
      };
    case actionTypes.GET_FAVORITE_BY_USER_ID:
      return {
        ...state,
        favorites: action.favorites || [],
        // posts: action.favorites?.post || [],
      };

    default:
      return state;
  }
};
export default postReducer;
