import React, { useEffect, useState } from 'react'
import { apiGetUserPosts, apiDeletePost } from '../../services/post'
import { Button, Loading } from '../../components'
import Swal from 'sweetalert2'

const ManagePosts = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchPosts = async () => {
        setLoading(true)
        const res = await apiGetUserPosts()
        if (res?.data?.err === 0) setPosts(res.data.response)
        setLoading(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Bạn chắc chắn muốn xóa tin này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        })
        if (confirm.isConfirmed) {
            setLoading(true)
            const res = await apiDeletePost(id)
            if (res?.data?.err === 0) {
                Swal.fire('Thành công', 'Đã xóa tin!', 'success')
                fetchPosts()
            } else {
                Swal.fire('Lỗi', res?.data?.msg || 'Xóa thất bại!', 'error')
            }
            setLoading(false)
        }
    }

    return (
        <div className='px-6'>
            <h1 className='text-2xl font-bold py-4 border-b border-gray-200'>Quản lý tin đăng</h1>
            {loading ? <Loading /> : (
                <div className='mt-4'>
                    {posts.length === 0 ? <p>Bạn chưa có tin đăng nào.</p> : (
                        <table className='w-full border text-left'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='p-2'>Tiêu đề</th>
                                    <th className='p-2'>Địa chỉ</th>
                                    <th className='p-2'>Ngày đăng</th>
                                    <th className='p-2'>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map(post => (
                                    <tr key={post.id} className='border-b'>
                                        <td className='p-2'>{post.title}</td>
                                        <td className='p-2'>{post.address}</td>
                                        <td className='p-2'>{new Date(post.createdAt).toLocaleString()}</td>
                                        <td className='p-2 flex gap-2'>
                                            {/* Nút sửa có thể mở modal hoặc chuyển trang */}
                                            <Button text='Sửa' bgColor='bg-yellow-500' textColor='text-white' onClick={() => alert('Chức năng sửa sẽ bổ sung sau!')} />
                                            <Button text='Xóa' bgColor='bg-red-500' textColor='text-white' onClick={() => handleDelete(post.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    )
}

export default ManagePosts 