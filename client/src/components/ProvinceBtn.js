import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { getPostsLimit } from "../store/actions";

const ProvinceBtn = ({ name, image, province }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    // console.log(province);
    dispatch(getPostsLimit({ province }));
  };
  return (
    <div
      onClick={handleOnClick}
      className=" shadow-md rounded-bl-md rounded-br-md text-blue-700 cursor-pointer hover:text-orange-600"
    >
      <img
        src={image}
        alt={name}
        className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="font-medium  p-2 text-center">{name}</div>
    </div>
  );
};

export default memo(ProvinceBtn);
