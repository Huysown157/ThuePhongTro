import {
  apiAddFavorite,
  apiGetFavoritesByUserId,
  apiRemoveFavorite,
} from "../../services/favorite";
import {
  apiGetNewPosts,
  apiGetPosts,
  apiGetPostsLimit,
  apiGetPostsLimitByUserId,
} from "../../services/post";
import actionTypes from "./actionType";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPosts();
    // console.log(response);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS,
      posts: null,
    });
  }
};

export const getPostsLimit = (query) => async (dispatch) => {
  try {
    // console.log("action post: ", query);
    const response = await apiGetPostsLimit(query);
    // console.log(response);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        posts: response.data.response,
        count: response.data?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT,
      posts: null,
    });
  }
};

export const getNewPosts = () => async (dispatch) => {
  try {
    const response = await apiGetNewPosts();
    // console.log(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_NEW_POSTS,
        newPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEW_POSTS,
        msg: response.data.msg,
        newPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NEW_POSTS,
      newPosts: null,
    });
  }
};

export const getPostsLimitByUserId = (query) => async (dispatch) => {
  try {
    // console.log("action post: ", query);
    const response = await apiGetPostsLimitByUserId(query);
    // console.log(response);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT_BY_USER_ID,
        postsOfUser: response.data.response,
        count: response.data?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT_BY_USER_ID,
        msg: response.data.msg,
        postsOfUser: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT_BY_USER_ID,
      posts: null,
    });
  }
};

export const getFavoriteByUserId = (payload) => async (dispatch) => {
  try {
    const response = await apiGetFavoritesByUserId(payload.userId);

    if (response?.data) {
      dispatch({
        type: actionTypes.GET_FAVORITE_BY_USER_ID,
        favorites: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_FAVORITE_BY_USER_ID,
      favorites: null,
    });
  }
};

export const removeFavorite = (payload) => async (dispatch) => {
  try {
    const response = await apiRemoveFavorite(payload.userId, payload.postId);
    if (response?.data) {
      dispatch(getFavoriteByUserId({ userId: payload.userId }));
    }
  } catch (error) {
    console.log("error removeFavorite:::", error);
  }
};

export const addFavorite = (payload) => async (dispatch) => {
  try {
    const response = await apiAddFavorite(payload.userId, payload.postId);

    dispatch(getFavoriteByUserId({ userId: payload.userId }));

    if (response?.data) {
      const { filters } = payload;
      setTimeout(() => {
        dispatch(getPostsLimit(filters));
      }, 50);
    }
  } catch (error) {
    console.log("error addFavorite:::", error);
  }
};

export const editDate = (dataEdit) => ({
  type: actionTypes.EDIT_DATA,
  dataEdit,
});
