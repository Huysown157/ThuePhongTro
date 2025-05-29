import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import FormEditRange from "../../components/FormEditRange";
import { getPriceRanges } from "../../store/actions";
import {
  apiAddPriceRange,
  apiDeletePriceRange,
  apiUpdatePriceRange,
} from "../../services";
import Swal from "sweetalert2";
import Button from "../../components/Button";

const ManagePrice = () => {
  const dispatch = useDispatch();
  const [selectRangeEdit, setSelectRangeEdit] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = async (data) => {
    // console.log("data update", data);
    let response;

    if (isEditMode) {
      response = await apiUpdatePriceRange(data);
    } else {
      response = await apiAddPriceRange(data);
    }

    if (response?.data?.err === 0) {
      setSelectRangeEdit({});

      Swal.fire(
        "Thành công!",
        `Đã ${isEditMode ? "cập nhật" : "thêm"} thông tin!`,
        "success"
      ).then(() => {
        if (isEditMode) {
          setIsEditMode(false);
        }

        dispatch(getPriceRanges());
      });
    } else {
      Swal.fire("Thất bại", "Có lỗi xảy ra!", "error");
    }
  };

  const handleOnClickEdit = (item) => {
    setIsEditMode(true);
    setSelectRangeEdit(item);
  };

  const handleCreateRange = () => {
    setIsEditMode(false);
    setSelectRangeEdit({
      title: "",
      from: "",
      to: "",
    });
  };

  const handleDeleteRange = async (id) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeletePriceRange(id);
        // console.log(response);
        if (response?.data?.err === 0) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(getPriceRanges());
            }
          );
        } else {
          Swal.fire("Oops!", "Delete failed!", "error");
        }
      }
    });
  };

  const { priceRanges } = useSelector((state) => state.app);
  return (
    <div className="px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl py-4">Quản lý khoảng giá</h1>
        <Button
          text="Thêm mới"
          bgColor="bg-secondary1"
          textColor={"text-white"}
          onClick={handleCreateRange}
        />
      </div>
      <div className="w-full">
        <table className="w-full table-auto border border-separate border-spacing-0 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 bg-gray-100">STT</th>
              <th className="border p-2 bg-gray-100">Tiêu đề</th>
              <th className="border p-2 bg-gray-100">Từ</th>
              <th className="border p-2 bg-gray-100">Đến</th>
              <th className="border p-2 bg-gray-100">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {priceRanges?.map((item, index) => (
              <tr key={item?.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item?.title}</td>

                <td className="border p-2">{item?.from}</td>
                <td className="border p-2">{item?.to}</td>
                <td className="border p-2">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <button
                      onClick={() => handleOnClickEdit(item)}
                      className="p-2 bg-blue-500 rounded-md "
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteRange(item?.id)}
                      className="p-2 bg-red-500 rounded-md "
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {Object.keys(selectRangeEdit).length > 0 && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectRangeEdit({});
          }}
          className="absolute flex top-0 right-0 left-0 bottom-0 bg-overlay-30 "
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-1100 bg-white m-auto pb-5"
          >
            <FormEditRange
              title={isEditMode ? "Cập nhật khoảng giá" : "Thêm khoảng giá"}
              payload={selectRangeEdit}
              setPayload={setSelectRangeEdit}
              onSubmit={handleSubmit}
              textButton={!isEditMode ? "Thêm" : "Cập nhật"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePrice;
