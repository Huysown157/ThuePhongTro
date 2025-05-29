import { useState } from "react";
import { Link } from "react-router-dom";
import anonAvatar from "../assets/anon-avatar.png";

import { apiUploadImages } from "../services";
import InputFormSystem from "./InputFormSystem";
import Button from "./Button";
import validate from "../utils/Common/validateFields";

function FormEditUser({ payload, onChangePayload, onSubmit }) {
  const [invalidFields, setInvalidFields] = useState([]);

  const handleUploadAvatar = async (e) => {
    const image = e.target?.files[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSETS_NAME);

    const response = await apiUploadImages(formData);

    if (response.status === 200) {
      onChangePayload((prev) => ({
        ...prev,
        avatar: response?.data?.secure_url,
      }));
    }
  };

  const handleSubmit = () => {
    const invalidCounter = validate(payload, setInvalidFields);

    if (invalidCounter === 0) {
      onSubmit({
        fullName: payload.fullName,
        email: payload.email,
        avatar: payload.avatar,
        phone: payload.phone,
        id: payload.id,
      });
    }
  };

  return (
    <div className="px-8">
      <h1 className="text-3xl py-4 border-b">Thông tin cá nhân</h1>
      <form className="py-4 space-y-4">
        <div className="flex flex-col justify-center items-center gap-2">
          <label className="font-medium" htmlFor="avatar">
            Ảnh đại diện
          </label>
          <img
            src={payload?.avatar || anonAvatar}
            alt="avatar"
            className="w-32 h-32 object-cover rounded-full"
          />
          <input
            onChange={(e) => handleUploadAvatar(e)}
            type="file"
            className="appearance-none"
            id="avatar"
            defaultValue={""}
          />
        </div>
        <div className="grid grid-cols-12 space-x-6">
          <div className="col-span-6 ">
            <InputFormSystem
              name={"fullName"}
              setValue={onChangePayload}
              label={"Tên hiển thị"}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              value={payload?.fullName}
            />
            <InputFormSystem
              name={"phone"}
              setValue={onChangePayload}
              label={"Số điện thoại"}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              value={payload?.phone}
            />
          </div>
          <div className="col-span-6 ">
            <InputFormSystem
              name={"email"}
              setValue={onChangePayload}
              label={"Email"}
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
              value={payload?.email}
            />
            <div className="flex flex-col gap-4">
              <label className="font-medium">Mật khẩu</label>
              <Link className="text-blue-500" to={"/"}>
                Đổi mật khẩu
              </Link>
            </div>
          </div>
        </div>
        <Button
          fullWidth
          text={"Cập nhật"}
          bgColor={"bg-secondary1"}
          textColor={"text-white"}
          onClick={handleSubmit}
        ></Button>
      </form>
    </div>
  );
}

FormEditUser.propTypes = {};

export default FormEditUser;
