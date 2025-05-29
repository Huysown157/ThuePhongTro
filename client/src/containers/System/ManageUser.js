import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import FormEditUser from "../../components/FormEditUser";
import { apiUpdateUser } from "../../services";
import { apiDeleteUser, apiGetUsers } from "../../services/user";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../store/actions";
import anonAvatar from "../../assets/anon-avatar.png";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [selectUserEdit, setSelectUserEdit] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await apiGetUsers();
    if (response?.status === 200) {
      setUsers(response?.data?.response);
    }
  };

  const handleSubmit = async (data) => {
    console.log("data update", data);
    const response = await apiUpdateUser(data);

    if (response?.status === 200) {
      setSelectUserEdit({});

      Swal.fire("Thành công!", "Đã cập nhật thông tin!", "success").then(() => {
        dispatch(getCurrentUser());
        fetchUsers();
      });
    } else {
      Swal.fire("Thất bại", "Có lỗi xảy ra!", "error");
    }
  };

  const handleOnClickEdit = (user) => {
    setSelectUserEdit(user);
  };

  const handleDeleteUser = async (id) => {
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
        const response = await apiDeleteUser(id);
        // console.log(response);
        if (response?.data?.err === 0) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              fetchUsers();
            }
          );
        } else {
          Swal.fire("Oops!", "Delete failed!", "error");
        }
      }
    });

    // const response = await apiDeleteUser(id);
    // console.log(response);
  };

  return (
    <div className="px-8">
      <h1 className="text-3xl py-4">Quản lý người dùng</h1>
      <div className="w-full">
        <table className="w-full table-auto border border-separate border-spacing-0 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 bg-gray-100">STT</th>
              <th className="border p-2 bg-gray-100">Họ và tên</th>
              <th className="border p-2 bg-gray-100">Ảnh đại diện</th>
              <th className="border p-2 bg-gray-100">Email</th>
              <th className="border p-2 bg-gray-100">Số điện thoại</th>
              <th className="border p-2 bg-gray-100">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((item, index) => (
              <tr key={item?.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{item?.fullName}</td>
                <td className="border p-2 flex items-center justify-center">
                  <img
                    className="h-20 w-20 object-cover rounded-md"
                    src={item?.avatar || anonAvatar}
                    alt="avatar"
                  />
                </td>
                <td className="border p-2">{item?.email}</td>
                <td className="border p-2">{item?.phone}</td>
                <td className="border p-2">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <button
                      onClick={() => handleOnClickEdit(item)}
                      className="p-2 bg-blue-500 rounded-md "
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(item?.id)}
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

      {Object.keys(selectUserEdit).length > 0 && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectUserEdit({});
          }}
          className="absolute flex top-0 right-0 left-0 bottom-0 bg-overlay-30 "
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-1100 bg-white m-auto pb-5"
          >
            <FormEditUser
              payload={selectUserEdit}
              onChangePayload={setSelectUserEdit}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
