import React from "react";
import Select from "react-select";
import { FormGroup, Label } from "reactstrap";
import makeAnimated from "react-select/animated";
import "./customDropDown.scss";
const animatedComponents = makeAnimated();

export default function CustomDropDown({
  label,
  name,
  value,
  options = [],
  placeholder = "Select an option",
  required = false,
  onChange,
  disabled = false,
  isMulti = false,
  isClearable = true,
  isSearchable = true,
  error,
}) {
  const handleChange = (selectedOption) => {
    if (name !== undefined) {
      onChange(selectedOption, name);
    } else {
      onChange(selectedOption);
    }
  };

  return (
    <div className="custom-dropdown-wrapper">
      <FormGroup>
        {label && (
          <Label className="form-label">
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </Label>
        )}
        <Select
          classNamePrefix="custom-select"
          value={value}
          onChange={handleChange}
          options={options}
          isMulti={isMulti}
          isDisabled={disabled}
          placeholder={placeholder}
          isClearable={isClearable}
          isSearchable={isSearchable}
          components={animatedComponents}
          menuPortalTarget={document.body} 
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 })
          }}
        />
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </FormGroup>
    </div>
  );
}
