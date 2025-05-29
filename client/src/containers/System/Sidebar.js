import React from "react";
import anonAvatar from "../../assets/anon-avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { menuSidebar } from "../../utils/menuSidebar";
import { NavLink } from "react-router-dom";
import * as actions from "../../store/actions";
import { menuSidebarAdmin } from "../../utils/menuSidebarAdmin";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser.role);
  const dispatch = useDispatch();

  const handleLink = (text) => {
    // console.log(text);
    if (text === "Đăng xuất") {
      dispatch(actions.logout());
    }
  };

  return (
    <div className="p-4 space-y-5">
      <div>
        <div className="flex gap-3 items-center mb-3">
          <img
            src={currentUser?.avatar || anonAvatar}
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full"
          />
          <div className="text-left">
            <p className="font-semibold">{currentUser?.fullName}</p>
            <p className="text-sm">{currentUser?.phone}</p>
          </div>
        </div>
        <span>
          Mã thành viên:{" "}
          <span className="font-semibold">{`${currentUser?.id}`}</span>
        </span>
      </div>

      <div>
        {currentUser?.role === "admin" &&
          menuSidebarAdmin?.map((item) => {
            return (
              <NavLink
                key={item.id}
                onClick={() => handleLink(item.text)}
                to={item?.path}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-2 py-2 border-b font-semibold  hover:bg-gray-200"
                    : "flex items-center gap-2 py-2 border-b  hover:bg-gray-200"
                }
              >
                {item?.icon}
                {item.text}
              </NavLink>
            );
          })}

        {menuSidebar.map((item) => {
          return (
            <NavLink
              key={item.id}
              onClick={() => handleLink(item.text)}
              to={item?.path}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 py-2 border-b font-semibold  hover:bg-gray-200"
                  : "flex items-center gap-2 py-2 border-b  hover:bg-gray-200"
              }
            >
              {item?.icon}
              {item.text}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
