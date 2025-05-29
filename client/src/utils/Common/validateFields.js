const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  let fields = Object.entries(payload); //CHuyen object -> array gom co key/value

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  fields.forEach((item) => {
    // console.log(item[1], typeof item[1]);
    if (
      typeof item[1] === "string" &&
      item[1]?.trim() === "" &&
      item[0] !== "avatar"
    ) {
      setInvalidFields((prev) => [
        ...prev,
        {
          name: item[0],
          message: "Bạn không thể bỏ trống trường này.",
        },
      ]);
      invalids++;
    }
  });

  fields.forEach((item) => {
    switch (item[0]) {
      case "password":
        if (item[1].length < 6) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Mật khẩu phải có tối thiểu 6 kí tự",
            },
          ]);
          invalids++;
        }
        break;

      case "phone":
        if (!item[1].match("[0-9]{10}")) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Số điện thoại không hợp lệ",
            },
          ]);
          invalids++;
        }
        break;
      case "email":
        if (!isValidEmail(item[1])) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Email không hợp lệ",
            },
          ]);
          invalids++;
        }
        break;

      case "price":
      case "area":
        if (+item[1] === 0) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Chưa đặt giá trị cho trường này",
            },
          ]);
          invalids++;
        }
        if (isNaN(+item[1])) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Trường này phải là số!",
            },
          ]);
          invalids++;
        }
        break;

      case "from":
      case "to":
        if (isNaN(+item[1])) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              message: "Trường này phải là số!",
            },
          ]);
          invalids++;
        }
        break;
      default:
        break;
    }
  });
  return invalids;
};

export default validate;
