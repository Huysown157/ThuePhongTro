import icons from "../utils/icons";

const {
  BsPencilSquare,
  MdOutlineContentPaste,
  AiOutlineUser,
  HiOutlineLogout,
} = icons;

export const menuManagerAccount = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <BsPencilSquare />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: <MdOutlineContentPaste />,
  },
  {
    id: 3,
    text: "Thông tin cá nhân",
    path: "/he-thong/thong-tin-ca-nhan",
    icon: <AiOutlineUser />,
  },
  {
    id: 4,
    text: "Đăng xuất",
    path: null,
    icon: <HiOutlineLogout />,
  },
];
