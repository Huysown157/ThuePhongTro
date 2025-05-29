import React, { useState } from "react";
import InputFormSystem from "./InputFormSystem";
import Button from "./Button";
import validate from "../utils/Common/validateFields";

const FormEditCate = ({
  title,
  payload,
  setPayload,
  onSubmit,
  textButton = "Cập nhật",
}) => {
  const [invalidFields, setInvalidFields] = useState([]);

  const handleSubmit = () => {
    const invalidCounter = validate(payload, setInvalidFields);

    if (invalidCounter === 0) {
      onSubmit({
        title: payload.title,
        header: payload.header,
        subheader: payload.subheader,
        id: payload.id,
      });
    }
  };
  return (
    <div className="px-8">
      <h1 className="text-3xl py-4 border-b">{title}</h1>
      <div className="py-4 space-y-4">
        <div className=" ">
          <InputFormSystem
            name={"title"}
            setValue={setPayload}
            label={"Tiêu đề"}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            value={payload?.title}
          />
          <InputFormSystem
            name={"header"}
            setValue={setPayload}
            label={"Header"}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            value={payload?.header}
          />
        </div>
        <div className="col-span-6 ">
          <InputFormSystem
            name={"subheader"}
            setValue={setPayload}
            label={"Subheader"}
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            value={payload?.subheader}
          />
        </div>
      </div>

      <Button
        fullWidth
        text={textButton}
        bgColor={"bg-secondary1"}
        textColor={"text-white"}
        onClick={handleSubmit}
      ></Button>
    </div>
  );
};

export default FormEditCate;
