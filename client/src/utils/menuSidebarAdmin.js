import { FiUsers } from "react-icons/fi";
import { MdOutlineCategory, MdPriceChange } from "react-icons/md";
import icons from "./icons";
import { TbChartArea } from "react-icons/tb";

const {
  BsPencilSquare,
  MdOutlineContentPaste,
  AiOutlineUser,
  HiOutlineLogout,
  TbMessageCircle,
  TbCategory,
} = icons;
export const menuSidebarAdmin = [
  {
    id: 1,
    text: "Quản lý người dùng",
    path: "/he-thong/quan-ly-nguoi-dung",
    icon: <FiUsers />,
  },
  {
    id: 2,
    text: "Quản lý danh mục",
    path: "/he-thong/quan-ly-danh-muc",
    icon: <MdOutlineCategory />,
  },
  {
    id: 3,
    text: "Quản lý khoảng giá",
    path: "/he-thong/quan-ly-khoang-gia",
    icon: <MdPriceChange />,
  },
  {
    id: 4,
    text: "Quản lý khoảng diện tích",
    path: "/he-thong/quan-ly-khoang-dien-tich",
    icon: <TbChartArea />,
  },
  // {
  //   id: 5,
  //   text: "Quản lý Tất cả bài viết",
  //   path: "/he-thong/quan-ly-tat-ca-bai-viet",
  //   icon: <HiOutlineLogout />,
  // },
];
