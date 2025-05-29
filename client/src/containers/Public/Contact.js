import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button, InputForm } from "../../components";

const Contact = () => {
  const [payload, setPayload] = useState({
    fullName: "",
    phone: "",
    content: "",
  });

  const handleSubmit = () => {
    // console.log(payload);
    Swal.fire(
      `Cảm ơn ${payload?.fullName || ""}!`,
      "Phản hồi của bạn đã được chúng tôi ghi nhận",
      "success"
    ).then(() => {
      setPayload({ fullName: "", phone: "", content: "" });
    });
  };

  return (
    <div className="w-full my-3 rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Liên hệ với chúng tôi</h1>
      <div className="flex gap-4">
        <div className="flex h-fit flex-1 gap-4 flex-col p-4 rounded-3xl text-white bg-gradient-to-br from-[#0039e4] to-[#04dbf1]">
          <h4 className="font-medium ">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn F3-HUTECH
          </span>
          <span>Điện thoại: 036 7632 968</span>
          <span>Email: sonnguyenh715@gmail.com</span>
          <span>Zalo: 036 7632 968</span>
          <span>Viber: 036 7632 968</span>
          <span>
            Địa chỉ:  Khu Công nghệ cao TP.HCM (SHTP), Xa lộ Hà Nội, P. Hiệp Phú, TP. Thủ Đức, TP.HCM
          </span>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-md p-4">
          <h4 className="font-medium text-lg mb-4">Liên hệ trực tuyến</h4>
          <form className="space-y-6">
            <div>
              <InputForm
                label={"HỌ TÊN CỦA BẠN"}
                value={payload?.fullName}
                setValue={setPayload}
                keyPayload={"fullName"}
              />
            </div>
            <div>
              <InputForm
                label={"SỐ ĐIỆN THOẠI"}
                value={payload?.phone}
                setValue={setPayload}
                keyPayload={"phone"}
              />
            </div>
            <div>
              <label htmlFor="desc">NỘI DUNG MÔ TẢ</label>
              <textarea
                value={payload?.content}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, content: e.target.value }))
                }
                // name="content"
                id="desc"
                cols="30"
                rows="3"
                className="w-full rounded-md p-2 outline-none bg-[#e8f0fe]"
              ></textarea>
            </div>
            <Button
              text={"Gửi liên hệ"}
              bgColor={"bg-secondary1"}
              textColor={"text-white"}
              fullWidth
              onClick={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
