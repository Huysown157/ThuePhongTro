import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Contact, Intro } from "../../components";
import * as actions from "../../store/actions";
import Header from "./Header";
import { Navigation, Search } from "./index";
import { apiGetCurrentUser } from "../../services/user";
import { path } from "../../utils/constant";

const Home = () => {
  const location = useLocation();
  // console.log(location?.pathname);
  //Dung useEffect de goi api
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getNewPosts());
  }, []);

  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-full ">
      <Header></Header>
      <Navigation></Navigation>
      {location?.pathname !== `/${path.LOGIN}` &&
        location?.pathname !== `/${path.CONTACT}` &&
        location?.pathname !== `/${path.INSTRUCTION}` &&
        !location?.pathname?.includes("chi-tiet") && <Search />}

      <div className="w-4/5 mx-auto flex flex-col justify-start mt-5">
        <Outlet></Outlet>
      </div>
      <div className="w-4/5 mx-auto mt-5 space-y-8">
        <Intro></Intro>
        <Contact></Contact>
      </div>
      <div className="h-[100px]"></div>
    </div>
  );
};

export default Home;
