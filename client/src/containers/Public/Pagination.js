import React, { useEffect, useState } from "react";
import { PageNumber } from "../../components";
import { useSelector } from "react-redux";
import icons from "../../utils/icons";
import { useSearchParams } from "react-router-dom";

const { GrLinkNext, GrLinkPrevious } = icons;

const Pagination = () => {
  const { count, posts } = useSelector((state) => state.post); //count: tổng số post, posts: data 5 posts
  const [arrPage, setArrPage] = useState([]); //Luu mang cac page: 1,2,3,..
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [searchParams] = useSearchParams(); //Luu thong tin searchParams

  useEffect(() => {
    let page = searchParams.get("page");
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);
    // console.log("maxpage", maxPage);

    let end = currentPage + 1 > maxPage ? maxPage : currentPage + 1;
    // console.log("end", end);

    let start = currentPage - 1 <= 0 ? 1 : currentPage - 1;
    // console.log("start", start);

    let temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setArrPage(temp);

    currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false);
    currentPage >= maxPage - 1 ? setIsHideEnd(true) : setIsHideEnd(false);
  }, [count, posts, currentPage]); //khi count hoặc posts thay đổi thì sẽ cập nhật lại maxPage

  return (
    <div className="flex items-center justify-center py-5 gap-4">
      {!isHideStart && (
        <PageNumber
          icon={<GrLinkPrevious />}
          text={1}
          setCurrentPage={setCurrentPage}
        />
      )}
      {!isHideStart && <PageNumber text={"..."} />}
      {arrPage.length > 0 &&
        arrPage.map((item) => {
          return (
            <PageNumber
              key={item}
              text={item}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          );
        })}

      {!isHideEnd && <PageNumber text={"..."} />}
      {!isHideEnd && (
        <PageNumber
          icon={<GrLinkNext />}
          text={Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS)}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Pagination;
