import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Rental,
  HomePage,
  DetailPost,
  Contact,
  Instruction,
} from "./containers/Public";
import { path } from "./utils/constant";
import {
  CreatePost,
  EditProfile,
  ManagePost,
  ManagePrice,
  ManageUser,
  ManageCate,
  System,
  ManageArea,
  FavoritePost,
} from "./containers/System";
import * as actions from "./store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrentUser());
    }, 100);
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getPriceRanges());
    dispatch(actions.getAreaRanges());
    dispatch(actions.getProvinces());
  }, []);
  return (
    <div className=" bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.TIM_NGUOI_O_GHEP} element={<Rental />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.INSTRUCTION} element={<Instruction />} />
          <Route
            path={path.DETAIL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
          <Route path="*" element={<HomePage />} />
        </Route>

        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.MANAGE_CATE} element={<ManageCate />} />
          <Route path={path.MANAGE_PRICE} element={<ManagePrice />} />
          <Route path={path.MANAGE_AREA} element={<ManageArea />} />
          <Route path={path.PROFILE} element={<EditProfile />} />
          <Route path={path.FAVORITE_POST} element={<FavoritePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
