import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import MultiSelectionFilter from "../multiSelectionFilter/MultiSelectionFilter";
import CustomDatePicker from "../customDatePicker/CustomDatePicker";
import CustomInput from "../customInput/CustomInput";
import CustomDropDown from "../customDropDown/CustomDropDown";
import useDebounce from "../../customHooks/useDebounce";
import { GrPowerReset } from "react-icons/gr";

export default function DynamicFilterRenderer({
  configList,
  handleApply,
  handleReset,
}) {
  const [inputValues, setInputValues] = useState({});

  // Create a debounced value for each input key
  const debouncedInputs = useDebounce(inputValues, 500);

  // Update `handleApply` when debounced input values change
  useEffect(() => {
    Object.entries(debouncedInputs).forEach(([key, val]) => {
      if (val) {
        handleApply(val, key);
      }
    });
  }, [debouncedInputs]);

  useEffect(() => {
    const inputDefaults = {};
    configList.forEach((config) => {
      if (config.type === "input") {
        inputDefaults[config.key] = config.value || "";
      }
    });

    // Only update if values have changed
    const isChanged = Object.keys(inputDefaults).some(
      (key) => inputDefaults[key] !== inputValues[key]
    );

    if (isChanged) {
      setInputValues(inputDefaults);
    }
  }, [configList]);

  const handleInputChange = (key, value) => {
    setInputValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderFilterComponent = (config) => {
    const {
      type,
      label,
      value,
      options,
      key,
      placeholder,
      isSearchable = true,
      format = "DD/MM/YYYY hh:mm A",
      withTime = false,
      required = false,
      mode = "range",
      disabled = false,
      isClearable = true,
    } = config;

    switch (type) {
      case "multi":
        return (
          <MultiSelectionFilter
            label={label}
            options={options}
            value={value || []}
            onApply={(selected) => handleApply(selected, key)}
            disabled={disabled}
            isSearchable={isSearchable}
          />
        );
      case "single":
        return (
          <CustomDropDown
            label={""}
            name={key}
            value={value}
            options={options}
            onChange={(selected) => handleApply(selected, key)}
            disabled={disabled}
            isSearchable={isSearchable}
            placeholder={placeholder || label}
            required={required}
            isClearable={isClearable}
            isMulti={false}
          />
        );
      case "date":
        return (
          <CustomDatePicker
            value={value}
            onChange={(date) => handleApply(date, key)}
            placeholder={placeholder}
            required={required}
            format={format}
            withTime={withTime}
            mode={mode}
          />
        );
      case "input":
        return (
          <CustomInput
            value={inputValues[key] || ""}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder={placeholder}
          />
        );
      case "reset":
        return (
          <button onClick={handleReset} className="reset-filter-btn">
            <GrPowerReset /> Reset Filter
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <Row className="mb-3">
      {configList?.map((config, index) => (
        <Col key={index} xs="12" sm="6" md="4" lg="3" xl="2">
          {renderFilterComponent(config)}
        </Col>
      ))}
    </Row>
  );
}
