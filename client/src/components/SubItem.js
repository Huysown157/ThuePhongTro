import React from "react";
import moment from "moment";
import "moment/locale/vi"; //Chuyển ngôn ngữ thời gian: 2 day ago -> 2 ngày trước
import convertToMillion from "../utils/Common/convertToMillion";
import { Link } from "react-router-dom";
import { convertToSlug } from "../utils/Common/convertToSlug";

const SubItem = ({ id, title, price, image, createdAt }) => {
  return (
    <div className="w-full flex items-center gap-3 border-b border-gray-300 py-2">
      <Link
        className="block"
        to={`/chi-tiet/${convertToSlug(title?.replaceAll("/", "-"))}/${id}`}
      >
        <img
          src={image?.url}
          alt="anh"
          className=" h-[80px] w-28 object-cover rounded-md"
        />
      </Link>

      <div className="w-full">
        <Link
          className="text-blue-800"
          to={`/chi-tiet/${convertToSlug(title?.replaceAll("/", "-"))}/${id}`}
        >
          {`${title?.slice(0, 50)}...`}
        </Link>
        <div className="flex justify-between items-center w-full mt-2">
          <span className="text-green-600 font-bold ">
            {convertToMillion(price)}
          </span>
          <span className="text-gray-500 text-sm">
            {moment(createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubItem;
