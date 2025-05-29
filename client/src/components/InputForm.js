import React, { memo } from "react";

const InputForm = ({
  label,
  value,
  setValue,
  keyPayload,
  invalidFields,
  setInvalidFields,
  type,
}) => {
  return (
    <div>
      <label className="text-xs" htmlFor={keyPayload}>
        {label}
      </label>
      <input
        type={type || "text"}
        id={keyPayload}
        className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [keyPayload]: e.target.value }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
        autoComplete="off"
      />
      {/* Show invalid Field:: some-every=>true/false find-filter=>value/null */}
      {invalidFields?.some((item) => item.name === keyPayload) && (
        <small className="text-red-500 italic">
          {invalidFields.find((item) => item.name === keyPayload)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(InputForm);
