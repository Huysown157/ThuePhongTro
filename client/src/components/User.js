import React from "react";
import { useSelector } from "react-redux";
import anonAvatar from "../assets/anon-avatar.png";

const User = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex items-center gap-2">
      <img
        src={currentUser?.avatar || anonAvatar}
        alt="avatar"
        className="w-10 h-10 object-cover rounded-full shadow-md"
      />
      <div>
        <div>
          <span>Xin chào</span> <b>{currentUser?.fullName || ""}</b>
        </div>
        <div>
          <span>Mã tài khoản:</span> <b>{`${currentUser?.id || ""}`}</b>
        </div>
      </div>
    </div>
  );
};

export default User;
