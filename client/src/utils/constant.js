export const path = {
  HOME: "/*",
  // HOME__PAGE: ":page", //route con kh có dấu / ở trc
  LOGIN: "login", //route con kh có dấu / ở trc
  REGISTER: "register",
  CHO_THUE_PHONG_TRO: "cho-thue-phong-tro",
  CHO_THUE_CAN_HO: "cho-thue-can-ho",
  CHO_THUE_MAT_BANG: "cho-thue-mat-bang",
  NHA_CHO_THUE: "nha-cho-thue",
  TIM_NGUOI_O_GHEP: "tim-nguoi-o-ghep",
  DETAIL_POST__TITLE__POSTID: "chi-tiet/:title/:postId",
  CONTACT: "lien-he",
  INSTRUCTION: "huong-dan",

  SYSTEM: "/he-thong/*",
  CREATE_POST: "tao-moi-bai-dang",
  MANAGE_POST: "quan-ly-bai-dang",
  MANAGE_USER: "quan-ly-nguoi-dung",
  MANAGE_CATE: "quan-ly-danh-muc",
  MANAGE_PRICE: "quan-ly-khoang-gia",
  MANAGE_AREA: "quan-ly-khoang-dien-tich",
  PROFILE: "thong-tin-ca-nhan",
  FAVORITE_POST: "tin-yeu-thich",
};

export const text = {
  HOME_TITLE: "Kênh phòng trọ số 1 Việt Nam",
  HOME_DESCRIPTION:
    "Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
};

export const location = [
  {
    id: "hcm",
    name: "Phòng trọ Hồ Chí Minh",
    image: "https://phongtro123.com/images/location_hcm.jpg",
    province: "Hồ Chí Minh",
  },
  {
    id: "hn",
    name: "Phòng trọ Hà Nội",
    image: "https://phongtro123.com/images/location_hn.jpg",
    province: "Hà Nội",
  },
  {
    id: "dn",
    name: "Phòng trọ Đà Nẵng",
    image: "https://phongtro123.com/images/location_dn.jpg",
    province: "Đà Nẵng",
  },
];
