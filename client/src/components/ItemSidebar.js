import React, { memo, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { convertToSlug } from "../utils/Common/convertToSlug";
import icons from "../utils/icons";

const { MdNavigateNext } = icons;

const ItemSideBar = ({
  title,
  content,
  isDoubleCol,
  type,
  isCancel,
  onResetCancel,
  onScroll,
}) => {
  const [searchParams] = useSearchParams();
  const [activeId, setActiveId] = useState(0);
  // console.log(type);

  // const handleFilterPosts = (code) => {
  //   // dispatch(actions.getPostsLimit({ [type]: code }));
  //   navigate({
  //     pathname: location.pathname,
  //     search: createSearchParams({
  //       [type]: code,
  //     }).toString(),
  //   });
  // };

  useEffect(() => {
    if (isCancel) {
      setActiveId(0);
      onResetCancel();
    }
  }, [isCancel, onResetCancel, searchParams]);

  const handleClick = (item) => {
    setActiveId(item.id);
    onScroll();
  };
  return (
    <div className="p-4 bg-white rounded-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div
        className={`space-y-2 grid ${
          isDoubleCol ? "grid-cols-2" : "grid-cols-1"
        } `}
      >
        {content?.length > 0 &&
          content.map((item) => {
            return (
              <Link
                // onClick={() => handleFilterPosts(item.code)}
                // to={`${convertToSlug(item.value)}`}
                // to={`?${type}=${item.code}`}
                to={
                  type === "category"
                    ? `${convertToSlug(item?.title)}`
                    : `?${type}Id=${item.id}`
                }
                key={item?.id}
                className={`flex gap-1  items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed 
                    ${activeId === item.id ? "text-orange-600 font-bold" : ""}`}
                onClick={() => handleClick(item)}
              >
                <MdNavigateNext color="#999" className="mt-[2px]" />
                <p>{item?.title}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default memo(ItemSideBar);

//memo: giúp hạn chế re render. chỉ render khi prop truyền xuống bị thay đổi
