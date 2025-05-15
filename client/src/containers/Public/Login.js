import React, { useState, useEffect } from 'react'
import { InputForm, Button } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from '../../ultils/Common/validateFields'

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(location.state?.flag)
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({
        phone: '',
        password: '',
        name: ''
    })
    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])

    useEffect(() => {
        isLoggedIn && navigate('/')
    }, [isLoggedIn])

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error')
    }, [msg, update])

    const handleSubmit = async () => {
        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        let invalids = validate(finalPayload,setInvalidFields)
        if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload))
    }
   


    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4'>
            <div className='bg-white w-full max-w-[600px] p-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.02]'>
                <div className='text-center mb-8'>
                    <h3 className='font-bold text-3xl text-gray-800 mb-2'>
                        {isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}
                    </h3>
                    <p className='text-gray-500'>
                        {isRegister ? 'Tạo tài khoản mới để bắt đầu' : 'Chào mừng bạn quay trở lại'}
                    </p>
                </div>

                <div className='space-y-6'>
                    {isRegister && (
                        <InputForm
                            setInvalidFields={setInvalidFields}
                            invalidFields={invalidFields}
                            label={'Họ và tên'}
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload={'name'}
                        />
                    )}
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'Số điện thoại'}
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                    />
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'Mật khẩu'}
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={'password'}
                        type='password'
                    />
                    <Button
                        text={isRegister ? 'Đăng ký' : 'Đăng nhập'}
                        bgColor='bg-blue-600 hover:bg-blue-700'
                        textColor='text-white'
                        fullWidth
                        onClick={handleSubmit}
                    />
                </div>

                <div className='mt-8 pt-6 border-t border-gray-200'>
                    {isRegister ? (
                        <div className='text-center'>
                            <p className='text-gray-600'>
                                Đã có tài khoản?{' '}
                                <span
                                    onClick={() => {
                                        setIsRegister(false)
                                        setPayload({
                                            phone: '',
                                            password: '',
                                            name: ''
                                        })
                                    }}
                                    className='text-blue-600 hover:text-blue-700 font-medium cursor-pointer transition-colors'
                                >
                                    Đăng nhập ngay
                                </span>
                            </p>
                        </div>
                    ) : (
                        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                            <span
                                className='text-blue-600 hover:text-blue-700 cursor-pointer transition-colors'
                            >
                                Quên mật khẩu?
                            </span>
                            <span
                                onClick={() => {
                                    setIsRegister(true)
                                    setPayload({
                                        phone: '',
                                        password: '',
                                        name: ''
                                    })
                                }}
                                className='text-blue-600 hover:text-blue-700 cursor-pointer transition-colors'
                            >
                                Tạo tài khoản mới
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login