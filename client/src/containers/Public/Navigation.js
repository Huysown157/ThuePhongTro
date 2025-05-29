import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"; //tra ve isactive
import * as actions from "../../store/actions";
import { convertToSlug } from "../../utils/Common/convertToSlug";
import { path } from "../../utils/constant";

const notActive =
  "hover:bg-secondary2 transition-all px-4 h-full flex items-center bg-secondary1";
const active =
  "hover:bg-secondary2 transition-all px-4 h-full flex items-center bg-secondary2";

// Map category title to path
const categoryPathMap = {
  "Cho thuê phòng trọ": path.CHO_THUE_PHONG_TRO,
  "Cho thuê căn hộ": path.CHO_THUE_CAN_HO,
  "Cho thuê mặt bằng": path.CHO_THUE_MAT_BANG,
  "Nhà cho thuê": path.NHA_CHO_THUE,
  "Tìm người ở ghép": path.TIM_NGUOI_O_GHEP,
};

const Navigation = ({ isAdmin }) => {
  // const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(actions.getCategories());
  }, [dispatch]);

  return (
    <div
      className={`w-full flex justify-center items-center h-[40px] bg-secondary1 text-white`}
    >
      <div
        className={` ${
          isAdmin ? "w-full" : "w-4/5"
        }  flex h-full  text-sm font-medium`}
      >
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item) => {
            const toPath = categoryPathMap[item?.title] || `/${convertToSlug(item?.title)}`;
            return (
              <div key={item.id} className="h-full">
                <NavLink
                  to={toPath}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item?.title}
                </NavLink>
              </div>
            );
          })}
        <NavLink
          to={path.CONTACT}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Liên hệ
        </NavLink>
        <NavLink
          to={path.INSTRUCTION}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Hướng dẫn
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
