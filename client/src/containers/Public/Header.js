import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button, User } from "../../components";
import * as actions from "../../store/actions";
import { path } from "../../utils/constant";
import icons from "../../utils/icons";
import { menuManagerAccount } from "../../utils/MenuManagerAccount";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BsArrowUp, BsHeartFill } from "react-icons/bs";
import { RiHeart2Line, RiHeartLine } from "react-icons/ri";

const { AiOutlinePlusCircle, BsChevronDown } = icons;

const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  // const headerRef = useRef();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
  const { favorites } = useSelector((state) => state.post);

  const postRef = useRef();

  const goLogin = useCallback(
    (flag) => {
      navigate(path.LOGIN, { state: { flag } });
    },
    [navigate]
  );

  const handleShowFavorites = () => {
    // dispatch(actions.getFavoriteByUserId({ userId: currentUser.id }));
  };

  // useEffect(() => {
  //   headerRef.current.scrollIntoView({ behavior: "smooth" }); //scroll cho đến khi header nằm trong view frame
  // }, [searchParams]);

  const handleLink = (text) => {
    // console.log(text);
    if (text === "Đăng xuất") {
      dispatch(actions.logout());
      setIsShowMenu(false);
    }
  };

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);

    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const ScrollToTop = () => {
    postRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // console.log(visible);
  return (
    <div
      ref={postRef}
      className="w-4/5 mx-auto flex items-center justify-between"
    >
      <Link to={"/"}>
        <img
          src={logo}
          alt="Logo"
          className="w-[240px] h-[70px] object-contain"
        />
      </Link>

      <div className="flex items-center gap-1">
        {/* Logged in */}
        {!isLoggedIn && (
          <div className="flex items-center gap-1">
            <small>F3-Hutech xin chào!</small>
            <Button
              text={"Đăng nhập"}
              textColor="text-white"
              bgColor="bg-[#3961fb]"
              onClick={() => goLogin(false)}
            />
            <Button
              text={"Đăng ký"}
              textColor="text-white"
              bgColor="bg-[#3961fb]"
              onClick={() => goLogin(true)}
            />
          </div>
        )}

        {isLoggedIn && (
          <div className="flex items-center gap-3 relative">
            <Link
              className="flex gap-1 hover:underline"
              to={`he-thong/${path.FAVORITE_POST}`}
            >
              <span>
                <RiHeartLine size={24} />
              </span>
              <span>Yêu thích({favorites?.length})</span>
            </Link>
            <User />
            <Button
              text={"Quản lý tài khoản"}
              textColor="text-white"
              bgColor="bg-blue-700"
              IcAfter={BsChevronDown}
              onClick={() => setIsShowMenu((prev) => !prev)}
            />

            {/* Menu quản lý tài khoản */}
            {isShowMenu && (
              <div className="absolute min-w-[200px] top-full right-0 bg-white shadow-md rounded-md p-4">
                {menuManagerAccount.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="py-2 border-b text-blue-600 hover:text-orange-500"
                    >
                      <Link
                        onClick={() => handleLink(item.text)}
                        to={item?.path}
                        className="flex items-center gap-2"
                      >
                        {item?.icon}
                        {item.text}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <Button
          text={"Đăng tin mới"}
          textColor="text-white"
          bgColor="bg-secondary2"
          IcAfter={AiOutlinePlusCircle}
          onClick={() => navigate("/he-thong/tao-moi-bai-dang")}
        />
      </div>

      <div
        onClick={ScrollToTop}
        className={`fixed bg-red-500 right-10 bottom-10 p-4 ease-in-out duration-300 transition-all animate-bounce rounded-full cursor-pointer hover:bg-red-600 text-white ${
          visible ? "block" : "hidden"
        }`}
      >
        <BsArrowUp size={30} />
      </div>
    </div>
  );
};

export default Header;
