import React, { useCallback, useState } from "react";
import { SearchItem, Modal } from "../../components";
import icons from "../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCodeArea, getCodePrice } from "../../utils/Common/getCodes";
import { getPostsLimit } from "../../store/actions";
import { useSearchParams } from "react-router-dom";

const {
  BsChevronRight,
  RiCrop2Line,
  TbReportMoney,
  HiOutlineLocationMarker,
  MdOutlineHouseSiding,
  FiSearch,
} = icons;

const Search = () => {
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const [queries, setQueries] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const { provinces, priceRanges, areaRanges, categories } = useSelector(
    (state) => state.app
  );
  // console.log(priceRanges);

  const handleShowModal = (content, name) => {
    setContent(content);
    setName(name);
    setIsShowModal(true);
  };

  //Xu li submit
  const handleSubmit = useCallback((e, query) => {
    e.stopPropagation();
    setQueries((prev) => ({ ...prev, ...query }));
    setIsShowModal(false);
  }, []);

  const handleSearch = () => {
    console.log(queries);
    const lastQueries = {
      categoryId: queries?.categoryId || "",
      province: queries?.province || "",
      priceRangeStart: queries?.priceRange?.from || "",
      priceRangeEnd: queries?.priceRange?.to || "",
      areaRangeStart: queries?.areaRange?.from || "",
      areaRangeEnd: queries?.areaRange?.to || "",
    };
    // console.log("Search", lastQueries);

    dispatch(getPostsLimit(lastQueries));
    setSearchParams(deleteEmptyObj(lastQueries));
  };

  //Xoa rong object
  const deleteEmptyObj = (object) => {
    Object.keys(object).forEach((key) => {
      if (!object[key]) {
        delete object[key];
      }
    });
    return object;
  };

  //moi lan render lai se tao 1 function moi nen phai dung useCallback den ngan chan dieu nay

  // console.log(queries);

  return (
    <div>
      <div className="h-[55px] w-4/5 mx-auto my-3 p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2">
        <span
          onClick={() => handleShowModal(categories, "category")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<MdOutlineHouseSiding />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.category}
            defaultText={"Danh mục cho thuê"}
            fontWeight
          />
        </span>
        <span
          onClick={() => handleShowModal(provinces, "province")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<HiOutlineLocationMarker />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.province}
            defaultText={"Toàn quốc"}
          />
        </span>
        <span
          onClick={() => handleShowModal(priceRanges, "priceRange")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<TbReportMoney />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.priceRangeTitle}
            defaultText={"Chọn giá"}
          />
        </span>
        <span
          onClick={() => handleShowModal(areaRanges, "areaRange")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<RiCrop2Line />}
            IconAfter={<BsChevronRight color="rgb(156,163,175)" />}
            text={queries.areaRangeTitle}
            defaultText={"Chọn diện tích"}
          />
        </span>
        <button
          type="button"
          onClick={handleSearch}
          className="outline-none py-2 px-4 text-sm bg-secondary1 rounded-md flex-1 flex items-center justify-center gap-2 text-white font-medium"
        >
          <FiSearch />
          Tìm kiếm
        </button>
        <button
          type="button"
          className="bg-secondary2 py-2 px-4 text-sm rounded-md outline-none text-white font-medium"
          onClick={() => {
            setQueries({});
            setSearchParams();
          }}
        >
          Xóa
        </button>
      </div>

      {isShowModal && (
        <Modal
          handleSubmit={handleSubmit}
          content={content}
          name={name}
          queries={queries}
          setIsShowModal={setIsShowModal}
        />
      )}
    </div>
  );
};

export default Search;
