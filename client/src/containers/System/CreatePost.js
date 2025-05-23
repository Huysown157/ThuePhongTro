import React, { useState } from 'react'
import { Overview, Address, Loading, Button } from '../../components'
import { apiUploadImages, apiCreatePost } from '../../services'
import icons from '../../ultils/icons'
import { getCodes, getCodesArea } from '../../ultils/Common/getCodes'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from '../../ultils/Common/validateFields'
import OSMMap from '../../components/OSMMap'

const { BsCameraFill, ImBin } = icons

const CreatePost = () => {

    const [payload, setPayload] = useState({
        categoryCode: '',
        title: '',
        priceNumber: 0,
        areaNumber: 0,
        images: '',
        address: '',
        priceCode: '',
        areaCode: '',
        description: '',
        target: '',
        province: ''
    })
    const [imagesPreview, setImagesPreview] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { prices, areas } = useSelector(state => state.app)
    const { currentData } = useSelector(state => state.user)
    const [invalidFields, setInvalidFields] = useState([])

    const handleFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
        let images = []
        let files = e.target.files
        let formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
            let response = await apiUploadImages(formData)
            if (response.status === 200) images = [...images, response.data?.secure_url]
        }
        setIsLoading(false)
        setImagesPreview(prev => [...prev, ...images])
        setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
    }
    const handleDeleteImage = (image) => {
        setImagesPreview(prev => prev?.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
    }
    const handleSubmit = async () => {
        const finalPayload = {
            ...payload,
            userId: currentData?.id || '',
            provinceCode: payload.province,
            labelCode: payload.categoryCode || 'DEFAULT_LABEL',
            priceCode: payload.priceCode || '',
            areaCode: payload.areaCode || '',
            price: payload.priceNumber ? `${payload.priceNumber} đồng/tháng` : '',
            acreage: payload.areaNumber ? `${payload.areaNumber}m2` : '',
            published: new Date().toISOString().split('T')[0],
            hashtag: `#${Math.floor(Math.random() * 1000000)}`,
            overview: {
                code: payload.code || '',      // mã tin
                area: payload.area || '',      // khu vực
                type: payload.type || '',      // loại tin rao
                target: payload.target || '',  // đối tượng thuê
                bonus: payload.bonus || '',    // gói tin
            }
        }
        try {
            const res = await apiCreatePost(finalPayload)
            if (res?.data?.err === 0) {
                Swal.fire('Thành công', 'Đăng tin thành công!', 'success')
                // Có thể reset form hoặc chuyển trang nếu muốn
            } else {
                Swal.fire('Lỗi', res?.data?.msg || 'Đăng tin thất bại!', 'error')
            }
        } catch (error) {
            Swal.fire('Lỗi', 'Có lỗi xảy ra khi đăng tin!', 'error')
        }
    }
    
    

    return (
        <div className='px-6'>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>Đăng tin mới</h1>
            <div className='flex gap-4'>
                <div className='py-4 flex flex-col gap-8 flex-auto'>
                    <Address payload={payload} setPayload={setPayload} />
                    <Overview payload={payload} setPayload={setPayload} />
                    <div className='w-full mb-6'>
                        <h2 className='font-semibold text-xl py-4'>Hình ảnh</h2>
                        <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                        <div className='w-full'>
                            <label className='w-full border-2 h-[200px] my-4 gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md' htmlFor="file">
                                {isLoading
                                    ? <Loading />
                                    : <div className='flex flex-col items-center justify-center'>
                                        <BsCameraFill color='blue' size={50} />
                                        Thêm ảnh
                                    </div>}
                            </label>
                            <input onChange={handleFiles} hidden type="file" id='file' multiple />
                            <div className='w-full'>
                                <h3 className='font-medium py-4'>Ảnh đã chọn</h3>
                                <div className='flex gap-4 items-center'>
                                    {imagesPreview?.map(item => {
                                        return (
                                            <div key={item} className='relative w-1/3 h-1/3 '>
                                                <img src={item} alt="preview" className='w-full h-full object-cover rounded-md' />
                                                <span
                                                    title='Xóa'
                                                    onClick={() => handleDeleteImage(item)}
                                                    className='absolute top-0 right-0 p-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-full'
                                                >
                                                    <ImBin />
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button onClick={handleSubmit} text='Tạo mới' bgColor='bg-green-600' textColor='text-white' />
                    <div className='h-[500px]'>

                    </div>
                </div>
                <div className='w-[30%] flex-none'>
                    <OSMMap address={payload.address} />
                </div>
            </div>
        </div>
    )
}

export default CreatePost