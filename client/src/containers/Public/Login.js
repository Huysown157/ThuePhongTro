import React, { useEffect, useState } from "react";
import { Button, InputForm } from "../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import validate from "../../utils/Common/validateFields";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth); //hook nay giup lay gia tri trong reducer
  // console.log(msg);

  const [isRegister, setIsRegister] = useState(location.state?.flag);
  // console.log(location);
  const [invalidFields, setInvalidFields] = useState([]);
  const [payload, setPayload] = useState({
    fullName: "",
    phone: "",
    password: "",
    email: "",
  });

  //Chuyển trạng thái login với đăng ký
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);

  // Check login
  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    // console.log(msg);
    msg && Swal.fire("Opps !", msg, "error");
  }, [msg, update]);

  const handleSubmit = async () => {
    // Phan loai payload
    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };

    let invalids = validate(finalPayload, setInvalidFields);
    // Neu validate kh co loi -> gui api
    if (invalids === 0) {
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
    }
  };

  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm mx-auto">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Đăng ký" : "Đăng nhập"}
      </h3>
      <div className="w-full flex flex-col gap-5">
        <form className="w-full flex flex-col gap-5">
          {isRegister && (
            <>
              <InputForm
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                label={"HỌ TÊN"}
                value={payload.fullName}
                setValue={setPayload}
                keyPayload={"fullName"}
              />
              <InputForm
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                label={"EMAIL"}
                value={payload.email}
                setValue={setPayload}
                keyPayload={"email"}
              />
            </>
          )}
          <InputForm
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label={"SỐ ĐIỆN THOẠI"}
            value={payload.phone}
            setValue={setPayload}
            keyPayload={"phone"}
          />
          <InputForm
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label={"MẬT KHẨU"}
            value={payload.password}
            setValue={setPayload}
            keyPayload={"password"}
            type="password"
          />
          <Button
            text={isRegister ? "Đăng ký" : "Đăng nhập"}
            textColor="text-white"
            bgColor="bg-secondary1"
            fullWidth
            onClick={handleSubmit}
          ></Button>
        </form>
      </div>

      <div className="mt-7 flex items-center justify-between">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                setIsRegister(false);
                setPayload({
                  fullName: "",
                  phone: "",
                  password: "",
                  email: "",
                });
              }}
            >
              Đăng nhập ngay
            </span>
          </small>
        ) : (
          <>
            <small className="text-[blue] hover:text-[red] cursor-pointer">
              Bạn quên mật khẩu
            </small>
            <small
              onClick={() => {
                setIsRegister(true);
                setPayload({
                  fullName: "",
                  phone: "",
                  password: "",
                  email: "",
                });
              }}
              className="text-[blue] hover:text-[red] cursor-pointer"
            >
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
