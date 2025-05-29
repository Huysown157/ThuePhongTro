import authReducer from "./authReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import appReducer from "./appReducer";

import { combineReducers } from "redux"; //gom các reducer lại thành 1 reducer lớn
import storage from "redux-persist/lib/storage"; //nơi lưu state của reducer
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2"; //độ sâu merge
import { persistReducer } from "redux-persist";

//Redux-persist giúp mình có thể tùy chọn lưu hoặc kh lưu state nào của reducer dưới localstorage mà kh cần phải thủ công

//config persist for Reducer
const commonConfig = {
  storage,
  stateReconsider: autoMergeLevel2,
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "token"], //whitelist chứa những state nào muốn lưu ở localstorage, ngược lại có blacklist
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  user: userReducer,
  post: postReducer,
  app: appReducer,
});
//reducer nào muốn persist thì bọc nó trong hàng persistReducer cùng với config

export default rootReducer;
