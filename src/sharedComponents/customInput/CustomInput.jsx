import React from "react";
import "./customInput.scss";
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
    <div className="custom-input-wrapper">
      {label && (
        <Label for={name}>
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
        className="input-box"
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
