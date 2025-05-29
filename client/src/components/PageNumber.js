import React, { memo } from "react";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";

const notActive = "px-5 py-3 bg-white hover:bg-gray-300 rounded-md ";
const active = "px-5 py-3 bg-[#E13427] text-white hover:opacity-90 rounded-md";

const PageNumber = ({ text, currentPage, icon, setCurrentPage, type }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  let entries = searchParams.entries();
  // console.log(entries);
  // console.log(currentPage);

  const append = (entries) => {
    let params = [];
    searchParams.append("page", +text);
    for (let entry of entries) {
      params.push(entry);
    }
    //chuyen thanh object
    let a = {};
    params?.map((item) => {
      a = { ...a, [item[0]]: item[1] };
    });
    return a;
  };

  const handleChangePage = () => {
    if (!(text === "...")) {
      setCurrentPage(+text);
      navigate({
        pathname: location.pathname,
        search: createSearchParams(append(entries)).toString(),
      });
    }
  };
  return (
    <div
      className={
        +text === +currentPage
          ? `${active} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
          : `${notActive} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
      }
      onClick={handleChangePage}
    >
      {icon || text}
    </div>
  );
};

export default memo(PageNumber);
