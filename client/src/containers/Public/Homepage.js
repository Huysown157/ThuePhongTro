import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ItemSideBar, Province, RelatedPost } from "../../components";
import { text } from "../../utils/constant";
import List from "./List";

const HomePage = () => {
  const [isCancel, setIsCancel] = useState(false);
  const postRef = useRef();

  // const [params] = useSearchParams();
  const { categories, priceRanges, areaRanges } = useSelector(
    (state) => state.app
  );

  // console.log({ categories, priceRanges, areaRanges });

  const ScrollToList = () => {
    postRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleReset = () => {
    setIsCancel(false);
  };
  return (
    <div className=" flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
        <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
      </div>
      <Province></Province>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 w-full" ref={postRef}>
          <List />
          {/* <Pagination /> */}
        </div>
        <div className="col-span-4 w-full space-y-4">
          <ItemSideBar
            onResetCancel={handleReset}
            onScroll={ScrollToList}
            isCancel={isCancel}
            type="category"
            content={categories}
            title="Danh mục cho thuê"
            isDoubleCol={false}
          />
          <ItemSideBar
            onResetCancel={handleReset}
            onScroll={ScrollToList}
            isCancel={isCancel}
            type="priceRange"
            content={priceRanges}
            title="Xem theo giá"
            isDoubleCol={true}
          />
          <ItemSideBar
            onResetCancel={handleReset}
            onScroll={ScrollToList}
            isCancel={isCancel}
            type="areaRange"
            content={areaRanges}
            title="Xem theo diện tích"
            isDoubleCol={true}
          />
          <div className="w-full p-3 bg-red-600 text-white text-center rounded-md hover:bg-red-500 transition-all ease-in-out duration-300">
            <Link
              onClick={() => {
                setIsCancel(true);
                ScrollToList();
              }}
              to={"/"}
            >
              Hủy
            </Link>
          </div>
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
