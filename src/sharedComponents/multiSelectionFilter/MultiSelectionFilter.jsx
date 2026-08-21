import React, { useEffect, useRef, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
} from "reactstrap";

export default function MultiSelectionFilter({
  label,
  options = [], //{label, value}
  value = [],
  onApply,
  disabled = false,
  isSearchable = true,
}) {
  // Add due to pass unique key for select all
  const checkboxIdRef = useRef(
    `selectAll-${Math.random().toString(36).substr(2, 9)}`
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSelected(value);
  }, [value, dropdownOpen]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleChange = (option) => {
    const exists = selected?.some((item) => item?.value === option?.value);
    if (exists) {
      setSelected(selected?.filter((item) => item?.value !== option?.value));
    } else {
      setSelected([...selected, option]);
    }
  };

  const handleSelectAllToggle = () => {
    if (selected?.length === options?.length) {
      setSelected([]); //Deselect
    } else {
      setSelected([...options]); //Select all
    }
  };

  const handleApply = () => {
    onApply?.(selected);
    setSearchTerm("");
    setDropdownOpen(false);
  };

  const handleReset = () => {
    setSelected([]);
  };

  const isSelected = (option) =>
    selected?.some((item) => item?.value === option?.value);

  const isAllSelected = selected?.length === options?.length;

  const filteredOption = options?.filter((opt) =>
    opt?.label?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          caret
          disabled={disabled}
          color="light"
          className="!flex !items-center !justify-between !w-full !bg-transparent !border !border-secondary !font-medium !text-[#333333] !h-[45px] hover:!bg-[#f8f9fa] hover:!border-[#adb5bd] after:!ml-auto"
        >
          {label}
          {value?.length > 0 && (
            <span className="bg-brand-start text-white rounded-full py-1 px-2 text-xs min-w-[24px] h-6 flex items-center justify-center leading-none ml-[5px]">
              {value?.length}
            </span>
          )}
        </DropdownToggle>
        <DropdownMenu className="!rounded-lg !shadow-[0_4px_20px_rgba(0,0,0,0.1)] !border !border-[#dee2e6] !bg-white !w-full">
          <div className="max-h-[300px] overflow-y-auto p-[5px]">
            {isSearchable && (
              <div className="mb-2 px-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={disabled}
                />
              </div>
            )}
            <div className="form-check d-flex align-items-center cursor-text hover:bg-[#f1f3f5] focus:!bg-white">
              <Input
                type="checkbox"
                className="form-check-input me-2 !cursor-pointer !mt-0 !border !border-[#212529]"
                id={checkboxIdRef.current}
                disabled={disabled}
                onChange={handleSelectAllToggle}
                checked={isAllSelected}
              />
              <label
                htmlFor={checkboxIdRef.current}
                className="form-check-label !cursor-pointer !mt-2 !text-[#212529]"
              >
                {isAllSelected ? "Deselect All" : "Select All"}
              </label>
            </div>
            <div className="checkbox-list">
              {filteredOption?.map((option) => (
                <DropdownItem
                  className="px-0 !bg-transparent cursor-text hover:!bg-transparent focus:!bg-transparent active:!bg-transparent"
                  key={option?.value}
                  toggle={false}
                >
                  <div className="form-check d-flex align-items-center">
                    <Input
                      type="checkbox"
                      className="form-check-input me-2 !cursor-pointer !mt-0 !border !border-[#212529]"
                      id={option?.value}
                      disabled={disabled}
                      onChange={() => handleChange(option)}
                      checked={isSelected(option)}
                    />
                    <label
                      htmlFor={option?.value}
                      className="form-check-label !cursor-pointer !mt-2 !text-[#212529]"
                    >
                      {option?.label}
                    </label>
                  </div>
                </DropdownItem>
              ))}
              {
                filteredOption?.length === 0 && (
                  <div className="px-3 py-2 text-muted">No options found</div>
                )
              }
            </div>
          </div>

          <div className="d-flex justify-content-between mt-3 gap-2 border-t-2 border-[#212529]">
            <Button
              size="sm"
              className="!min-w-[70px] !m-[10px] !border-2 !border-brand-start !bg-transparent !text-[#212529] !font-bold hover:!bg-brand-start hover:!text-white"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              size="sm"
              className="!min-w-[70px] !m-[10px] !border-none !bg-brand-start !font-bold"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
