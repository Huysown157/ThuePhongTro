import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import FormEditUser from "../../components/FormEditUser";
import { apiUpdateUser } from "../../services";
import { getCurrentUser } from "../../store/actions";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [payload, setPayload] = useState({});

  const handleSubmit = async (data) => {
    const response = await apiUpdateUser(data);

    if (response?.status === 200) {
      Swal.fire("Thành công!", "Đã cập nhật thông tin!", "success").then(() => {
        dispatch(getCurrentUser());
      });
    } else {
      Swal.fire("Thất bại", "Có lỗi xảy ra!", "error");
    }
  };

  useEffect(() => {
    if (currentUser) {
      setPayload(currentUser);
    }
  }, [currentUser]);

  return (
    <FormEditUser
      onChangePayload={setPayload}
      payload={payload}
      onSubmit={handleSubmit}
    />
  );
};

export default EditProfile;
