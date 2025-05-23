import React, { useEffect, useState } from 'react';
import { apiGetUserPosts, apiDeletePost } from '../../services/post';
import { Button, Loading } from '../../components';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import moment from 'moment';
import 'moment/locale/vi';
import { UpdatePost } from '../../components';

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [dataEdit, setDataEdit] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const fetchPosts = async () => {
        setLoading(true);
        const res = await apiGetUserPosts();
        if (res?.data?.err === 0) {
            setPosts(res.data.response);
            setFilteredPosts(res.data.response);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (!dataEdit) {
             fetchPosts();
             setIsEdit(false);
        }
    }, [dataEdit]);

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Bạn chắc chắn muốn xóa tin này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            customClass: {
                confirmButton: 'swal2-confirm',
                cancelButton: 'swal2-cancel',
            },
        });
        if (confirm.isConfirmed) {
            setLoading(true);
            const res = await apiDeletePost(id);
            if (res?.data?.err === 0) {
                Swal.fire('Thành công', 'Đã xóa tin!', 'success');
                fetchPosts();
            } else {
                Swal.fire('Lỗi', res?.data?.msg || 'Xóa thất bại!', 'error');
            }
            setLoading(false);
        }
    };

    const compareDate = (expiredString) => {
        const expired = new Date(expiredString);
        const currentTime = new Date();
        return currentTime <= expired ? 'Đang hoạt động' : 'Đã hết hạn';
    };

    const handleFilterByStatus = (status) => {
        setStatusFilter(status);
        if (status === 'all') {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter(post => compareDate(post?.overview?.expired) === status);
            setFilteredPosts(filtered);
        }
    };

    const handleEdit = (post) => {
        setDataEdit(post);
        setIsEdit(true);
    };

    return (
        <div className="px-6">
            <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <h1 className="text-2xl font-bold">Quản lý tin đăng</h1>
                <select 
                    className="p-2 border rounded-md outline-none"
                    value={statusFilter}
                    onChange={(e) => handleFilterByStatus(e.target.value)}
                >
                    <option value="all">Tất cả tin đăng</option>
                    <option value="Đang hoạt động">Đang hoạt động</option>
                    <option value="Đã hết hạn">Đã hết hạn</option>
                </select>
            </div>

            {isEdit ? (
                <UpdatePost dataEdit={dataEdit} setIsEdit={setIsEdit} />
            ) : loading ? (
                <Loading />
            ) : (
                <div className="mt-4">
                    {filteredPosts.length === 0 ? (
                        <p className="text-center text-gray-500 py-4">Bạn chưa có tin đăng nào.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border text-left">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-3">Mã tin</th>
                                        <th className="p-3">Ảnh đại diện</th>
                                        <th className="p-3">Tiêu đề</th>
                                        <th className="p-3">Địa chỉ</th>
                                        <th className="p-3">Giá</th>
                                        <th className="p-3">Ngày bắt đầu</th>
                                        <th className="p-3">Ngày hết hạn</th>
                                        <th className="p-3">Trạng thái</th>
                                        <th className="p-3">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPosts.map((post) => (
                                        <tr key={post.id} className="border-b hover:bg-gray-50">
                                             <td className="p-3">{post?.overview?.code}</td>
                                            <td className="p-3 flex justify-start items-center">
                                                <img
                                                    src={JSON.parse(post?.images?.image)?.[0] || ''}
                                                    alt="Ảnh đại diện"
                                                    className="w-10 h-10 object-cover rounded-md"
                                                />
                                            </td>
                                            <td className="p-3">{post.title}</td>
                                            <td className="p-3">{post.address}</td>
                                            <td className="p-3">{post?.attributes?.price}</td>
                                            <td className="p-3">{moment(post?.overview?.created).format('HH:mm DD/MM/YYYY')}</td>
                                            <td className="p-3">{moment(post?.overview?.expired).format('HH:mm DD/MM/YYYY')}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 rounded-full text-sm ${
                                                    compareDate(post?.overview?.expired) === 'Đang hoạt động' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {compareDate(post?.overview?.expired)}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        text="Sửa"
                                                        bgColor="bg-yellow-500 hover:bg-yellow-600"
                                                        textColor="text-white"
                                                        onClick={() => handleEdit(post)}
                                                    />
                                                    <Button
                                                        text="Xóa"
                                                        bgColor="bg-red-500 hover:bg-red-600"
                                                        textColor="text-white"
                                                        onClick={() => handleDelete(post.id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default ManagePosts;