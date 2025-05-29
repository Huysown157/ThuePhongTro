import { BsHeartFill } from "react-icons/bs";
import icons from "../utils/icons";
import { RiHeartLine } from "react-icons/ri";

const {
  BsPencilSquare,
  MdOutlineContentPaste,
  AiOutlineUser,
  HiOutlineLogout,
  TbMessageCircle,
} = icons;

export const menuSidebar = [
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
    text: "Tin Yêu thích",
    path: "/he-thong/tin-yeu-thich",
    icon: <RiHeartLine />,
  },
  {
    id: 5,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <TbMessageCircle />,
  },
  {
    id: 6,
    text: "Đăng xuất",
    path: "/he-thong/thoat",
    icon: <HiOutlineLogout />,
  },
];
