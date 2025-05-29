import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import UpdatePost from "../../components/UpdatePost";
import { apiDeletePost, apiUpdatePost } from "../../services";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import convertToMillion from "../../utils/Common/convertToMillion";
import { convertToSlug } from "../../utils/Common/convertToSlug";

const ManagePost = () => {
  const dispatch = useDispatch();
  const { postsOfUser, count, dataEdit } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);

  // console.log(postsOfUser);

  const [page, setPage] = useState(1);
  const [isDelete, setIsDelete] = useState(false);
  const [statusPost, setStatusPost] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dispatch(actions.getPostsLimitByUserId({ page }));
  }, [dispatch, page, dataEdit, isDelete]);

  useEffect(() => {
    if (statusPost === "") {
      setPosts(postsOfUser);
    } else {
      const activePost = postsOfUser?.filter(
        (item) => item?.status === statusPost
      );
      setPosts(activePost);
    }
  }, [statusPost, postsOfUser, isDelete]);

  const handleChangePage = (value) => {
    // postRef.current.scrollIntoView({ behavior: "smooth" });
    setPage(value);
  };

  const handleCloseModel = () => {
    setIsEdit(false);
    dispatch(actions.editDate({}));
  };

  const handleDeletePost = async (id) => {
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
        const response = await apiDeletePost(id);
        if (response?.data?.err === 0) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              dispatch(actions.getPostsLimitByUserId({ page }));
              // setIsDelete(true);
            }
          );
        } else {
          Swal.fire("Oops!", "Delete failed!", "error");
        }
      }
    });
  };

  const handleApprovePost = async (data) => {
    // console.log(data);
    const response = await apiUpdatePost(data);
    // console.log(response);
    if (response?.data?.response?.err === 0) {
      Swal.fire(
        "Thành công!",
        "Cập nhật trạng thái thành công!",
        "success"
      ).then(() => {
        setIsDelete(!isDelete);
      });
    } else {
      Swal.fire("Oops!", "Cập nhật trạng thái thất bại!", "error");
    }
  };

  return (
    <div className="px-8">
      <div className="flex items-center justify-between w-full ">
        <h1 className="text-3xl py-4 ">Quản lý bài đăng</h1>
        <div>
          <select
            className="outline-none rounded-md border border-gray-300 p-2"
            name=""
            id=""
            value={statusPost}
            onChange={(e) => setStatusPost(e.target.value)}
          >
            <option value="">Lọc theo trạng thái</option>
            <option value="SHOW">Tin đã duyệt</option>
            <option value="HIDE">Tin chưa duyệt</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <table className="w-full table-auto border border-separate border-spacing-0 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 bg-gray-100">STT</th>
              <th className="border p-2 bg-gray-100">Ảnh đại diện</th>
              <th className="border p-2 bg-gray-100">Tiêu đề</th>
              <th className="border p-2 bg-gray-100">Giá </th>
              <th className="border p-2 bg-gray-100">Diện tích</th>
              <th className="border p-2 bg-gray-100">Trạng thái</th>
              {currentUser?.role === "admin" && (
                <th className="border p-2 bg-gray-100">Thao tác</th>
              )}
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr className="text-center">
                <td colSpan={7}>
                  Bạn chưa có tin đăng nào! Bấm{" "}
                  <Link
                    className="text-blue-500"
                    to={"/he-thong/tao-moi-bai-dang"}
                  >
                    vào đây
                  </Link>{" "}
                  để tạo bài đăng mới.
                </td>
              </tr>
            ) : (
              posts?.map((item, index) => {
                return (
                  <tr key={item?.id} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2 flex items-center justify-center">
                      <Link
                        to={`/chi-tiet/${convertToSlug(
                          item?.title?.replaceAll("/", "-")
                        )}/${item?.id}`}
                      >
                        <img
                          className="h-20 w-20 object-cover rounded-md"
                          src={
                            item?.images.find((item) => item?.url !== null)?.url
                          }
                          alt="post"
                        />
                      </Link>
                    </td>
                    <td className="border p-2">
                      <Link
                        to={`/chi-tiet/${convertToSlug(
                          item?.title?.replaceAll("/", "-")
                        )}/${item?.id}`}
                      >
                        {item?.title}
                      </Link>
                    </td>
                    <td className="border p-2">
                      {convertToMillion(item?.price)}
                    </td>
                    <td className="border p-2">{item?.area + "m²"}</td>
                    <td className="border p-2">
                      {item?.status === "SHOW" ? "Đã duyệt" : "Chưa duyệt"}
                    </td>
                    {currentUser?.role === "admin" && (
                      <td className="border p-2">
                        <div className="flex items-center justify-center gap-2 text-white">
                          <button
                            onClick={() => {
                              dispatch(actions.editDate(item));
                              setIsEdit(true);
                            }}
                            className="p-2 bg-blue-500 rounded-md "
                          >
                            <AiOutlineEdit />
                          </button>
                          <button
                            onClick={() => handleDeletePost(item?.id)}
                            className="p-2 bg-red-500 rounded-md "
                          >
                            <AiOutlineDelete />
                          </button>
                          <button
                            onClick={() =>
                              handleApprovePost({
                                id: item?.id,
                                status:
                                  item.status === "SHOW" ? "HIDE" : "SHOW",
                              })
                            }
                            className="p-2 bg-yellow-500 rounded-md "
                          >
                            {item?.status === "SHOW" ? <BiShow /> : <BiHide />}
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="p-5 flex flex-col items-center ">
        <Pagination
          size="large"
          color="secondary"
          shape="rounded"
          page={page}
          onChange={(e, value) => handleChangePage(value)}
          hidePrevButton={true}
          hideNextButton={true}
          count={Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS)}
        ></Pagination>
      </div>

      {isEdit && <UpdatePost handleCloseModel={handleCloseModel} />}
    </div>
  );
};

export default ManagePost;
