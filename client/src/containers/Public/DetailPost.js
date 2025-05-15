import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getDetailPost } from '../../store/actions/post'

const DetailPost = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { detailPost } = useSelector(state => state.post)

    useEffect(() => {
        if (id) dispatch(getDetailPost(id))
    }, [id])

    if (!detailPost) return <div className="text-center py-10">Đang tải...</div>

    return (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-4">{detailPost.title}</h2>
            {detailPost.images?.image && (
                <img src={JSON.parse(detailPost.images.image)[0]} alt="Hình ảnh" className="w-full rounded mb-4" />
            )}
            <p className="mb-2"><b>Địa chỉ:</b> {detailPost.address}</p>
            <p className="mb-2"><b>Mô tả:</b> {detailPost.description}</p>
            <p className="mb-2"><b>Giá:</b> {detailPost.attributes?.price}</p>
            <p className="mb-2"><b>Diện tích:</b> {detailPost.attributes?.acreage}</p>
            <p className="mb-2"><b>Liên hệ:</b> {detailPost.user?.name} - {detailPost.user?.phone}</p>
        </div>
    )
}

export default DetailPost