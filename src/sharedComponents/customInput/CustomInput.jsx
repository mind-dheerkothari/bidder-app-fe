import React from "react";
import { Input, Label } from "reactstrap";
export default function CustomInput({
  label,
  type = "text",
  name,
  value,
  placeholder,
  required = false,
  onChange,
  onKeyPress,
  error,
  validationRegex,
  disabled
}) {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (validationRegex) {
      const regex = new RegExp(validationRegex);
      if (inputValue === "" || regex.test(inputValue)) {
        onChange?.(e);
      }
    } else {
      onChange?.(e);
    }
  };
  return (
    <div className="flex flex-col gap-[5px]">
      {label && (
        <Label for={name} className="!text-black !font-bold !m-0">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Label>
      )}
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
        className="!p-[10px] !border !border-secondary !rounded-[5px] !bg-transparent !text-black focus:!border-none focus:!outline-none placeholder:!text-placeholder"
      />
      {error && <span className="error text-xs">{error}</span>}
    </div>
  );
}
