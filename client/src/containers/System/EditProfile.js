import React, { useEffect, useState } from 'react'
import { apiGetCurrent, apiUpdateUser } from '../../services/user'
import { Button, Loading } from '../../components'
import Swal from 'sweetalert2'

const EditProfile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ name: '', phone: '', zalo: '', fbUrl: '' })

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            const res = await apiGetCurrent()
            if (res?.data?.err === 0) {
                setUser(res.data.response)
                setForm({
                    name: res.data.response.name || '',
                    phone: res.data.response.phone || '',
                    zalo: res.data.response.zalo || '',
                    fbUrl: res.data.response.fbUrl || ''
                })
            }
            setLoading(false)
        }
        fetchUser()
    }, [])

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        setLoading(true)
        const res = await apiUpdateUser(form)
        if (res?.data?.err === 0) {
            Swal.fire('Thành công', 'Cập nhật thông tin thành công!', 'success')
        } else {
            Swal.fire('Lỗi', res?.data?.msg || 'Cập nhật thất bại!', 'error')
        }
        setLoading(false)
    }

    return (
        <div className='px-6'>
            <h1 className='text-2xl font-bold py-4 border-b border-gray-200'>Sửa thông tin cá nhân</h1>
            {loading ? <Loading /> : (
                <div className='max-w-lg mt-6'>
                    <div className='mb-4'>
                        <label className='block mb-1 font-medium'>Họ tên</label>
                        <input className='w-full border rounded p-2' name='name' value={form.name} onChange={handleChange} />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-1 font-medium'>Số điện thoại</label>
                        <input className='w-full border rounded p-2' name='phone' value={form.phone} onChange={handleChange} />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-1 font-medium'>Zalo</label>
                        <input className='w-full border rounded p-2' name='zalo' value={form.zalo} onChange={handleChange} />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-1 font-medium'>Facebook</label>
                        <input className='w-full border rounded p-2' name='fbUrl' value={form.fbUrl} onChange={handleChange} />
                    </div>
                    <Button text='Cập nhật' bgColor='bg-blue-600' textColor='text-white' onClick={handleSubmit} />
                </div>
            )}
        </div>
    )
}

export default EditProfile 