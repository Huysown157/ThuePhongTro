import React, { memo } from "react";

const SelectForm = ({
  label,
  options,
  value,
  setValue,
  type,
  reset,
  name,
  invalidFields,
  setInvalidFields,
}) => {
  const handleErrorText = () => {
    let nameInvalid = invalidFields?.find((item) => item.name === name);
    let addressInvalid = invalidFields?.find((item) => item.name === "address");

    return (
      `${nameInvalid ? nameInvalid.message : ""}` ||
      `${addressInvalid ? addressInvalid.message : ""}`
    );
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="select-address" className="font-medium">
        {label}
      </label>
      <select
        id="select-address"
        name="select-address"
        className="outline-none border rounded-md p-2"
        value={reset ? "" : value}
        onChange={(e) =>
          !name
            ? setValue(e.target.value)
            : setValue((prev) => ({
                ...prev,
                [name]: e.target.value,
              }))
        }
        onFocus={() => setInvalidFields([])}
      >
        <option value="">{`--Chọn ${label}--`}</option>
        {options?.map((item) => {
          return (
            <option
              key={
                type === "province"
                  ? item?.province_id
                  : type === "district"
                  ? item?.district_id
                  : type === "ward"
                  ? item?.ward_id
                  : item?.id
              }
              value={
                type === "province"
                  ? item?.province_id
                  : type === "district"
                  ? item?.district_id
                  : type === "ward"
                  ? item?.ward_id
                  : item?.id
              }
            >
              {type === "province"
                ? item?.province_name
                : type === "district"
                ? item?.district_name
                : type === "ward"
                ? item?.ward_name
                : item?.title}
            </option>
          );
        })}
      </select>
      {invalidFields && (
        <small className="text-red-500">{handleErrorText()}</small>
      )}
    </div>
  );
};

export default memo(SelectForm);
