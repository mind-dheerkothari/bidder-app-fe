import React from "react";
import "./customDatePicker.scss";
import { FormGroup, Label } from "reactstrap";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { formatToISO } from "../../utils/commonFunction";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/teal.css";
import "react-multi-date-picker/styles/layouts/mobile.css";

export default function CustomDatePicker({
  label,
  name,
  required = false,
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  error,
  mode = "single", //single or range
  format = "DD/MM/YYYY",
  withTime = false,
  minDate,
  maxDate,
}) {
  const handleChange = (value) => {
    const isoValue =
      mode === "range" ? value?.map(formatToISO) : formatToISO(value);
    if (name) {
      onChange?.(isoValue, name);
    } else {
      onChange?.(isoValue);
    }
  };

  const handleReset = () => {
    const resetValue = mode === "range" ? [] : null;
    if (name) {
      onChange?.(resetValue, name);
    } else {
      onChange?.(resetValue);
    }
  };
  return (
    <div className="custom-date-picker-wrapper">
      <FormGroup>
        {label && (
          <Label className="form-label">
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </Label>
        )}
        <DatePicker
          value={value}
          onChange={handleChange}
          range={mode === "range"}
          format={format}
          minDate={minDate}
          maxDate={maxDate}
          plugins={withTime ? [<TimePicker position="right" key="time" />] : []}
          render={<InputIcon placeholder={placeholder} disabled={disabled} />}
          className="rmdp-mobile teal"
          mobileButtons={[
            {
              label: "RESET",
              type: "button",
              className: "rmdp-button rmdp-action-button",
              onClick: handleReset,
            },
          ]}
        />
        {error && <div className="invalid-feedback d-block">{error}</div>}
      </FormGroup>
    </div>
  );
}
