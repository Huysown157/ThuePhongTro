const convertToMillion = (number) => {
  // Chuyển đổi số thành triệu đồng và làm tròn tới 2 chữ số thập phân
  const million = number / 1000000;

  // Thêm dấu ',' vào giữa các hàng ngàn
  const parts = million.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Nối chuỗi lại với nhau và trả về kết quả
  return parts.join(".") + " triệu/tháng";
};
export default convertToMillion;
