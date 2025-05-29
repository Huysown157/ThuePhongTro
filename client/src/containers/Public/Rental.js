import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ItemSideBar, Province, RelatedPost } from "../../components";
import { convertToSlug } from "../../utils/Common/convertToSlug";
import List from "./List";
import Pagination from "./Pagination";

const Rental = () => {
  const postRef = useRef();
  const { categories, priceRanges, areaRanges } = useSelector(
    (state) => state.app
  );
  const [isCancel, setIsCancel] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryCurrent, setCategoryCurrent] = useState({});
  const location = useLocation();

  useEffect(() => {
    //find match category
    const category = categories?.find(
      (item) => `/${convertToSlug(item?.title)}` === location.pathname
    );

    if (category) {
      setCategoryId(category.id);
      setCategoryCurrent(category);
    }
  }, [location, categories]);

  const ScrollToList = () => {
    postRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className=" flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{categoryCurrent?.header}</h1>
        <p className="text-base text-gray-700">{categoryCurrent?.subheader}</p>
      </div>
      <Province></Province>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 w-full" ref={postRef}>
          {categoryId && <List categoryId={categoryId} />}
          {/* <Pagination /> */}
        </div>
        <div className="col-span-4 w-full space-y-4">
          <ItemSideBar
            onResetCancel={() => setIsCancel(false)}
            onScroll={ScrollToList}
            isCancel={isCancel}
            type="priceRange"
            content={priceRanges}
            title="Xem theo giá"
            isDoubleCol={true}
          />
          <ItemSideBar
            onResetCancel={() => setIsCancel(false)}
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

export default Rental;
