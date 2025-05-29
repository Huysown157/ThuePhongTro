import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Address, Button, MapCustom, Overview } from "../../components";
import { apiCreatePost, apiUpdatePost, apiUploadImages } from "../../services";
import * as actions from "../../store/actions";
import { getRangeFromValue } from "../../utils/Common/getRangeFromValue";
import validate from "../../utils/Common/validateFields";
const CreatePost = ({ isEdit, handleCloseModel }) => {
  const dispatch = useDispatch();
  const { priceRanges, areaRanges } = useSelector((state) => state.app);
  const { currentUser } = useSelector((state) => state.user);
  const { dataEdit } = useSelector((state) => state.post);
  // console.log(dataEdit);
  //Lay data tat ca inputs
  const [payload, setPayload] = useState(() => {
    const initData = {
      title: isEdit ? dataEdit?.title : "",
      price: isEdit ? dataEdit?.price : "",
      area: isEdit ? dataEdit?.area : "",
      images: isEdit ? dataEdit?.images?.map((item) => item?.url) : "",
      address: isEdit ? dataEdit?.address : "",
      categoryId: isEdit ? dataEdit?.categoryId : "",
      priceRangeId: isEdit ? dataEdit?.priceRangeId : "",
      areaRangeId: isEdit ? dataEdit?.areaRangeId : "",
      description: isEdit ? dataEdit?.description : "",
      target: isEdit ? dataEdit?.target : "",
      province: isEdit ? dataEdit?.province : "",
    };
    return initData;
  });

  // console.log(payload?.images);

  const [imagePreview, setImagePreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

  useEffect(() => {
    if (dataEdit) {
      let images = dataEdit?.images?.map((item) => item?.url);
      // console.log(images);
      images && setImagePreview(images);
    }
  }, [dataEdit]);

  //Xu li up load hinh anh
  const handleUploadFiles = async (e) => {
    setInvalidFields([]);
    e.stopPropagation();
    let images = [];
    let files = e.target.files;
    setIsLoading(true);
    let formData = new FormData();
    for (const file of files) {
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_UPLOAD_ASSETS_NAME
      );

      const response = await apiUploadImages(formData);

      if (response.status === 200) {
        images = [...images, response?.data?.secure_url];
      }
    }

    setIsLoading(false);
    setImagePreview((prev) => [...prev, ...images]);
    setPayload((prev) => ({
      ...prev,
      images: [...prev?.images, ...images],
    }));
  };

  //Xu li xoa hinh anh
  const handleDeleteImage = (image) => {
    setImagePreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev.images?.filter((item) => item !== image),
    }));
  };

  const handleSubmit = async () => {
    let areaRangeId = getRangeFromValue(areaRanges, +payload?.area);
    let priceRangeId = getRangeFromValue(priceRanges, +payload?.price);

    let finalPayload = {
      ...payload,
      areaRangeId,
      priceRangeId,
      userId: currentUser?.id,
      target: payload?.target,
      id: dataEdit?.id,
    };

    // console.log(finalPayload);
    // console.log(payload);
    const result = validate(finalPayload, setInvalidFields);

    if (result === 0) {
      if (isEdit) {
        // Cap nhat
        const response = await apiUpdatePost(finalPayload);
        // console.log(response?.data?.response?.err);
        if (response?.data?.response?.err === 0) {
          Swal.fire("Thành công", "Cập nhật tin thành công", "success").then(
            () => {
              dispatch(actions.editDate({}));
              handleCloseModel();
            }
          );
        } else {
          Swal.fire("Có lỗi", "Cập nhật tin thất bại", "error");
        }
      } else {
        const response = await apiCreatePost(finalPayload);
        // console.log(response);
        if (response.status === 200) {
          Swal.fire("Thành công", "Tạo tin mới thành công", "success").then(
            () => {
              // dispatch(actions.editDate({}));
              setPayload({
                title: "",
                price: "",
                area: "",
                images: "",
                address: "",
                categoryId: "",
                priceRangeId: "",
                areaRangeId: "",
                description: "",
                target: "",
                province: "",
              });
              setImagePreview([]);
            }
          );
        } else {
          Swal.fire("Oops", "Đã có lỗi xãy ra", "error");
        }
      }
    }
  };
  return (
    <div className="px-8">
      <h1 className="text-3xl py-4 border-b">
        {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
      </h1>
      <div className="mt-4">
        <form className=" pb-8 space-y-8 ">
          <Address
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            setPayload={setPayload}
          />
          <Overview
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            payload={payload}
            setPayload={setPayload}
          />
          <div className="w-full">
            <h2 className="font-bold text-2xl">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full my-4">
              <label
                className=" flex flex-col gap-2 items-center justify-center border-2 border-gray-400 h-[200px] border-dashed rounded-md"
                htmlFor="file"
              >
                {/* <CircularProgress /> */}
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <BsFillCameraFill color="blue" size={50} />
                    Thêm ảnh
                  </>
                )}
              </label>
              <input
                onChange={handleUploadFiles}
                hidden
                type="file"
                id="file"
                multiple
              />
              <small className="text-red-500">
                {invalidFields?.some((item) => item.name === "images") &&
                  invalidFields?.find((item) => item.name === "images")
                    ?.message}
              </small>
            </div>
            <div>
              <h3 className="font-medium">Xem trước</h3>
              <div className="grid grid-cols-12 gap-4 w-full">
                {imagePreview?.map((item, index) => {
                  return (
                    item && (
                      <div key={index} className="relative col-span-4 ">
                        <img
                          className="rounded-md h-full w-full object-cover"
                          src={item}
                          alt="preview"
                        />
                        <span
                          onClick={() => handleDeleteImage(item)}
                          title="Xóa"
                          className="absolute top-1  right-1 p-2 cursor-pointer bg-gray-300  hover:bg-gray-400 rounded-full"
                        >
                          <MdDelete />
                        </span>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            onClick={handleSubmit}
            textColor="text-white"
            text="Thêm mới"
            bgColor="bg-green-600"
            fullWidth
          />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
