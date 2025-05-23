import React, { useState, useEffect } from 'react'
import { Overview, Address, Loading, Button } from '.' // Đã sửa đường dẫn import components
import { apiUploadImages, apiUpdatePost } from '../services/post' // Đã sửa đường dẫn import services
import icons from '../ultils/icons' // Đã sửa đường dẫn import ultils
import { getCodes, getCodesArea } from '../ultils/Common/getCodes' // Đã sửa đường dẫn import ultils
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from '../ultils/Common/validateFields' // Đã sửa đường dẫn import ultils
import moment from 'moment' // Giữ nguyên import moment nếu cần thiết

const { BsCameraFill, ImBin } = icons

const UpdatePost = ({ dataEdit, setIsEdit }) => {

    console.log('dataEdit:', dataEdit); // Log dataEdit khi component render

    // Khởi tạo state payload với dữ liệu từ dataEdit
    const [payload, setPayload] = useState({
        postId: dataEdit?.id || '',
        categoryCode: dataEdit?.categoryCode || '',
        title: dataEdit?.title || '',
        priceNumber: dataEdit?.priceNumber || 0,
        areaNumber: dataEdit?.areaNumber || 0,
        images: dataEdit?.images?.image ? JSON.parse(dataEdit.images.image) : [],
        address: dataEdit?.address || '',
        priceCode: dataEdit?.priceCode || '',
        areaCode: dataEdit?.areaCode || '',
        description: dataEdit?.description ? JSON.parse(dataEdit.description) : '',
        target: dataEdit?.overview?.target || '',
        province: dataEdit?.provinceCode || '',
        overviewId: dataEdit?.overview?.id || '',
        imagesId: dataEdit?.images?.id || '',
        attributesId: dataEdit?.attributes?.id || '',
        price: dataEdit?.attributes?.price || '',
        acreage: dataEdit?.attributes?.acreage || '',
        hashtag: dataEdit?.attributes?.hashtag || '',
        bonus: dataEdit?.overview?.bonus || '',
        area: dataEdit?.overview?.area || '',
        type: dataEdit?.overview?.type || ''
    })

    console.log('Initial payload:', payload); // Log payload khi khởi tạo

    // Khởi tạo state imagesPreview với dữ liệu ảnh đã có
    const [imagesPreview, setImagesPreview] = useState(dataEdit?.images?.image ? JSON.parse(dataEdit.images.image) : []);
    const [isLoading, setIsLoading] = useState(false)
    const { prices, areas, categories } = useSelector(state => state.app) // Lấy data cần thiết từ redux store nếu CreatePost làm
    const { currentData } = useSelector(state => state.user) // Lấy user data nếu cần
    const [invalidFields, setInvalidFields] = useState([]) // State cho validation

    // Cập nhật state khi dataEdit thay đổi (ví dụ: khi chọn bài khác để sửa)
    useEffect(() => {
        if (dataEdit) {
            setPayload({
                postId: dataEdit.id,
                categoryCode: dataEdit.categoryCode,
                title: dataEdit.title,
                priceNumber: dataEdit.priceNumber,
                areaNumber: dataEdit.areaNumber,
                images: dataEdit.images?.image ? JSON.parse(dataEdit.images.image) : [],
                address: dataEdit.address,
                priceCode: dataEdit.priceCode,
                areaCode: dataEdit.areaCode,
                description: dataEdit.description ? JSON.parse(dataEdit.description) : '',
                target: dataEdit.overview?.target || '',
                province: dataEdit.provinceCode,
                overviewId: dataEdit.overview?.id,
                imagesId: dataEdit.images?.id,
                attributesId: dataEdit.attributes?.id,
                price: dataEdit.attributes?.price || '',
                acreage: dataEdit.attributes?.acreage || '',
                hashtag: dataEdit.attributes?.hashtag || '',
                bonus: dataEdit.overview?.bonus || '',
                area: dataEdit.overview?.area || '',
                type: dataEdit.overview?.type || ''
            });
            setImagesPreview(dataEdit.images?.image ? JSON.parse(dataEdit.images.image) : []);
        }
    }, [dataEdit]);

    // Xử lý upload ảnh
    const handleFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
        let images = []
        let files = e.target.files
        let formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
            // Đảm bảo apiUploadImages được import đúng
            let response = await apiUploadImages(formData)
            if (response.status === 200) images = [...images, response.data?.secure_url]
        }
        setIsLoading(false)
        setImagesPreview(prev => [...prev, ...images])
        setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
    }

    // Xử lý xóa ảnh
    const handleDeleteImage = (image) => {
        setImagesPreview(prev => prev?.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
    }

    // Xử lý submit form cập nhật
    const handleSubmit = async () => {
        // Validate dữ liệu
        const validation = validate(payload, setInvalidFields);
        if (validation) {
            setIsLoading(true);
            try {
                // Chuẩn bị dữ liệu để gửi lên server
                const finalPayload = {
                    ...payload,
                    description: typeof payload.description === 'string' ? payload.description : JSON.stringify(payload.description),
                    images: Array.isArray(payload.images) ? JSON.stringify(payload.images) : payload.images
                };

                // Gọi API cập nhật
                const res = await apiUpdatePost(finalPayload.postId, finalPayload);

                if (res?.data?.err === 0) {
                    Swal.fire({
                        title: 'Thành công!',
                        text: 'Cập nhật tin đăng thành công!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        setIsEdit(false);
                    });
                } else {
                    Swal.fire('Lỗi!', res?.data?.msg || 'Cập nhật thất bại!', 'error');
                }
            } catch (error) {
                console.error('Update error:', error);
                Swal.fire('Lỗi!', 'Có lỗi xảy ra khi cập nhật tin đăng!', 'error');
            } finally {
                setIsLoading(false);
            }
        }
    }

    // Xử lý hủy bỏ
    const handleCancel = () => {
        setIsEdit(false); // Ẩn component UpdatePost
    };

    // Giao diện form
    return (
        <div className='px-6'>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Chỉnh sửa tin đăng</h1>
            {isLoading && <Loading />}
            <div className='flex gap-4'>
                <div className='py-4 flex flex-col gap-8 flex-auto'>
                    <Address 
                        payload={payload} 
                        setPayload={setPayload} 
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <Overview 
                        payload={payload} 
                        setPayload={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <div className='w-full'>
                        <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                        <small className='text-red-500'>Cập nhật hình ảnh</small>
                        <div className='w-full'>
                            <label className='w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg h-[200px] cursor-pointer hover:bg-gray-100'>
                                <BsCameraFill size={20} />
                                <span>Thêm ảnh</span>
                                <input
                                    type='file'
                                    id='images'
                                    hidden
                                    multiple
                                    onChange={handleFiles}
                                />
                            </label>
                        </div>
                        <div className='w-full'>
                            <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                            <div className='flex gap-4'>
                                {imagesPreview?.map((item, index) => (
                                    <div key={index} className='relative w-1/4 h-[200px]'>
                                        <img
                                            src={item}
                                            alt='preview'
                                            className='w-full h-full object-cover rounded-lg'
                                        />
                                        <span
                                            className='absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full cursor-pointer'
                                            onClick={() => handleDeleteImage(item)}
                                        >
                                            <ImBin />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[30%] flex-none py-4'>
                    <Button
                        text='Cập nhật'
                        bgColor='bg-blue-600'
                        textColor='text-white'
                        fullWidth
                        onClick={handleSubmit}
                    />
                    <Button
                        text='Hủy'
                        bgColor='bg-gray-500'
                        textColor='text-white'
                        fullWidth
                        onClick={handleCancel}
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdatePost;