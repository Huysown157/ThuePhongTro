import React, { memo } from "react";
import icons from "../utils/icons";
import { textIntro } from "../utils/dataIntro";
import Button from "./Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { convertToSlug } from "../utils/Common/convertToSlug";

const { GrStar } = icons;
const star = [1, 2, 3, 4, 5];

const Intro = () => {
  const { categories } = useSelector((state) => state.app);
  // console.log(categories);

  return (
    <div className="border bg-white rounded-md shadow-md p-4 text-center space-y-6 pb-16">
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">{textIntro.title}</h3>
        <p className="text-gray-800">
          {textIntro.description}
          <span className="text-link">
            {categories?.length > 0 &&
              categories.map((item, index) => {
                return (
                  <Link
                    to={`/${convertToSlug(item.title)}`}
                    key={item.id}
                    className="text-blue-600 font-medium hover:text-orange-600"
                  >
                    {`${item?.title?.toLowerCase()}, `}
                  </Link>
                );
              })}
          </span>
          {textIntro.description2}
        </p>
        <div className="flex justify-around ">
          {textIntro.statistic.map((item, index) => {
            return (
              <div key={index}>
                <h4 className="font-bold text-lg">{item.value}</h4>
                <p className="text-gray-700">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">{textIntro.price}</h3>
        <div className="flex text-yellow-400 justify-center text-2xl">
          {star.map((item, index) => {
            return (
              <span key={index}>
                <GrStar />
              </span>
            );
          })}
        </div>
        <p className="italic text-gray-600">{textIntro.comment}</p>
        <p className="textgray-7">{textIntro.author}</p>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg">{textIntro.question}</h3>
        <p>{textIntro.answer}</p>
        <div className="flex justify-center">
          <Button
            text="Đăng tin ngay"
            bgColor="bg-secondary2"
            textColor="text-white"
            px="px-6"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Intro);
