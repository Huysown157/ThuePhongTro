import React from "react";

const InputReadOnly = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium" htmlFor="exact-address">
        {label}
      </label>
      <input
        value={value || ""}
        id="exact-address"
        type="text"
        readOnly
        className="border p-2 rounded-md outline-none bg-gray-200 "
      />
    </div>
  );
};

export default InputReadOnly;
