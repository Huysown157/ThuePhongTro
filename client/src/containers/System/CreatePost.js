import React, { useEffect, useState } from 'react'
import { Overview, Address, Loading, Button } from '../../components'
import { apiUploadImages, apiCreatePost, apiUpdatePost } from '../../services'
import icons from '../../ultils/icons'
import { getCodesArea, getCodesPrice } from '../../ultils/Common/getCodes'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { restEdittData } from '../../store/actions'
import Swal from 'sweetalert2'

const { BsCameraFill, ImBin } = icons

const CreatePost = ({ isEdit = false }) => {
    const { dataEdit } = useSelector((state) => state.post)
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        categoryCode: dataEdit?.categoryCode || '',
        title: dataEdit?.title || '',
        priceNumber: dataEdit?.priceNumber * 1000000 || '',
        areaNumber: dataEdit?.areaNumber || '',
        address: dataEdit?.address || '',
        priceCode: dataEdit?.priceCode || '',
        areaCode: dataEdit?.areaCode || '',
        description: JSON.parse(dataEdit?.description || '""'),
        target: dataEdit?.overview?.target || '',
        province: dataEdit?.province || '',
        images: JSON.parse(dataEdit?.images?.image || '""'),
    })
    const { prices, areas, categories } = useSelector((state) => state.app)
    const { currentData } = useSelector((state) => state.user)
    const [isLoading, setIsLoading] = useState(false)
    const [imagesPreview, setImagesPreview] = useState([])
    const [isReset, setIsReset] = useState(false)

    useEffect(() => {
        if (dataEdit) {
            let images = JSON.parse(dataEdit?.images?.image)
            images && setImagesPreview(images)
        }
    }, [dataEdit])

    useEffect(() => {
        if (!isEdit) {
            setPayload({
                categoryCode: '',
                title: '',
                star: '',
                priceNumber: '',
                areaNumber: '',
                images: '',
                address: '',
                priceCode: '',
                areaCode: '',
                description: '',
                target: '',
                province: '',
            })
            dispatch(restEdittData())
            setImagesPreview([])
            setIsReset((prev) => !prev)
        }
    }, [isEdit])

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

    const handleSubmit = async (event) => {
        event.preventDefault()
        let priceCodeArr = getCodesPrice(+payload.priceNumber / Math.pow(10, 6), prices, 1, 15)
        let priceCode = priceCodeArr[0]?.code
        let areaCodeArr = getCodesArea(+payload.areaNumber, areas, 20, 90)
        let areaCode = areaCodeArr[0]?.code
        let finalPayload = {
            ...payload,
            priceCode,
            areaCode,
            userId: currentData.id,
            priceNumber: +payload.priceNumber / Math.pow(10, 6),
            target: payload.target || 'Tất cả',
            label: `${categories?.find((item) => item.code === payload?.categoryCode)?.value} ${
                payload?.address?.split(',')[0]
            }`,
        }

        if (dataEdit) {
            finalPayload.imagesID = dataEdit?.imagesID
            finalPayload.postId = dataEdit?.id
            finalPayload.attributesId = dataEdit?.attributesId
            finalPayload.overviewId = dataEdit?.overviewId
        }

        if (dataEdit) {
            const response = await apiUpdatePost(finalPayload)
            if (response?.data.err === 0) {
                Swal.fire('Thành công', 'Đã cập nhật bài đăng', 'success').then(() => {
                    setPayload({
                        categoryCode: '',
                        title: '',
                        star: '',
                        priceNumber: '',
                        areaNumber: '',
                        images: '',
                        address: '',
                        priceCode: '',
                        areaCode: '',
                        description: '',
                        target: '',
                        province: '',
                    })
                    dispatch(restEdittData())
                    setImagesPreview([])
                    setIsReset((prev) => !prev)
                })
            } else {
                Swal.fire('Oops!', 'Có lỗi gì đó', 'error')
            }
        } else {
            const response = await apiCreatePost(finalPayload)
            if (response?.data.err === 0) {
                Swal.fire('Thành công', 'Đã thêm bài đăng mới', 'success').then(() => {
                    setPayload({
                        categoryCode: '',
                        title: '',
                        star: '',
                        priceNumber: '',
                        areaNumber: '',
                        images: '',
                        address: '',
                        priceCode: '',
                        areaCode: '',
                        description: '',
                        target: '',
                        province: '',
                    })
                    setImagesPreview([])
                    setIsReset((prev) => !prev)
                })
            } else {
                Swal.fire('Oops!', 'Có lỗi gì đó', 'error')
            }
        }
    }

    return (
        <div className='px-6'>
            <h1 className='text-3xl font-medium py-4 border-b border-gray-200'>
                {isEdit ? 'Chỉnh sửa' : 'Đăng tin mới'}
            </h1>
            <div className='flex gap-4'>
                <form className='py-4 flex flex-col gap-8 flex-auto' onSubmit={handleSubmit}>
                    <Address key={'address_1'} payload={payload} setPayload={setPayload} isReset={isReset} />
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
                            <Button type='submit' text={isEdit ? 'Cập nhật' : 'Tạo mới'} bgColor='bg-green-600' textColor='text-white' />
                        </div>
                    </div>
                </form>
                <div className='w-[30%] flex-none'>
                    maps
                    <Loading />
                </div>
            </div>
        </div>
    )
}

export default CreatePost