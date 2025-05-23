import React, { memo, useEffect, useState } from 'react'
import { Select, InputReadOnly } from '../components'
import { apiGetPublicProvinces, apiGetPublicDistrict } from '../services'

const Address = ({ setPayload }) => {
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [reset, setReset] = useState(false)

    useEffect(() => {
        const fetchPublicProvince = async () => {
            const response = await apiGetPublicProvinces()
            if (response.status === 200) {
                setProvinces(response?.data)
            }
        }
        fetchPublicProvince()
    }, [])

    useEffect(() => {
        setDistrict('')
        const fetchPublicDistrict = async () => {
            const response = await apiGetPublicDistrict(province)
            if (response.status === 200) {
                setDistricts(response.data?.districts || [])
            }
        }
        province && fetchPublicDistrict()
        !province ? setReset(true) : setReset(false)
        !province && setDistricts([])
    }, [province])

    useEffect(() => {
        const selectedProvince = provinces?.find(item => item.code === +province)
        const selectedDistrict = districts?.find(item => item.code === +district)
        
        setPayload(prev => ({
            ...prev,
            address: `${selectedDistrict?.name ? `${selectedDistrict.name},` : ''}${selectedProvince?.name || ''}`.trim(),
            province: selectedProvince?.code || ''
        }))
    }, [province, district, provinces, districts])

    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Địa chỉ cho thuê</h2>
            <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                    <Select type='province' value={province} setValue={setProvince} options={provinces} label='Tỉnh/Thành phố' />
                    <Select reset={reset} type='district' value={district} setValue={setDistrict} options={districts} label='Quận/Huyện' />
                </div>
                <InputReadOnly
                    label='Địa chỉ chính xác'
                    value={`${districts?.find(item => item.code === +district)?.name ? `${districts?.find(item => item.code === +district)?.name},` : ''} ${provinces?.find(item => item.code === +province)?.name || ''}`}
                />
            </div>
        </div>
    )
}

export default memo(Address)