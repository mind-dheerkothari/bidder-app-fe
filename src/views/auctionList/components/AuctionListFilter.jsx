import React, { useEffect, useState } from "react";
import filterIcon from "../../../assets/icons/filter.svg";
import upArrowIcon from "../../../assets/icons/arrow_up.svg";
import downArrowIcon from "../../../assets/icons/arrow_down.svg";
import CustomDropDown from "../../../sharedComponents/customDropDown/CustomDropDown";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionCategoryLIst } from "../../../redux/slices/auctionSlice";
import { mapToSelectOptions } from "../../../utils/commonFunction";
import { PAGINATION_CONSTANT } from "../../../utils/propertyResolver";
import { getTrackBackground, Range } from "react-range";

export default function AuctionListFilter({
  filterState,
  setFilterState,
  setPage,
  min = 0,
  max = 100000,
  step = 1000,
}) {
  const [localCategory, setLocalCategory] = useState("");
  const [localValues, setLocalValues] = useState([min, max]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const dispatch = useDispatch();
  const { auctionCategoryList } = useSelector((state) => state.auction);
  useEffect(() => {
    dispatch(getAuctionCategoryLIst());
  }, []);

  useEffect(() => {
    if (filterState) {
      setLocalValues(filterState.rangeValue || [min, max]);
    }
  }, [filterState, min, max]);

  const handleApplyFilter = () => {
    setFilterState({
      ...filterState,
      selectedCategory: localCategory,
      rangeValue: localValues,
    });
    setPage(PAGINATION_CONSTANT.PAGE_ONE);
  };
  const handleResetFilter = () => {
    setLocalCategory("");
    setLocalValues([0, 0]);
    setFilterState({
      ...filterState,
      selectedCategory: "",
      rangeValue: [0, 0],
    });
    setPage(PAGINATION_CONSTANT.PAGE_ONE);
  };
  const isFilterBtnEnable =
    localValues[0] > 0 || localValues[1] > 0 || localCategory?.value;
  const filterCount = [
    filterState.rangeValue[0] !== 0 || filterState.rangeValue[1] !== 0 ? 1 : 0,
    filterState.selectedCategory ? 1 : 0,
  ].reduce((a, b) => a + b, 0);
  return (
    <div className="auction-filter-wrapper">
      {/* Filter header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="heading-text">
          Filter
          {filterCount > 0 && (
            <span className="filter-count">{filterCount}</span>
          )}
        </h1>
        <img src={filterIcon} alt="filter icon" />
      </div>
      <hr className="m-0 mb-3" />
      {/* Price Collapse */}
      <div
        className="collapse-card mt-3"
        onClick={() => setPriceOpen(!priceOpen)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Price</h5>
          <img
            src={priceOpen ? upArrowIcon : downArrowIcon}
            alt="filter icon"
            width={20}
          />
        </div>
      </div>
      {priceOpen && (
        <div className="my-3">
          <Range
            label="Select your value"
            step={step}
            min={min}
            max={max}
            values={localValues}
            onChange={(values) => setLocalValues(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  background: getTrackBackground({
                    values: localValues,
                    colors: ["#ccc", "#0d6efd", "#ccc"],
                    min,
                    max,
                  }),
                  borderRadius: "4px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                key={props.key}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#7b2334",
                  border: "2px solid white",
                  borderRadius: "50%",
                  boxShadow: "0px 2px 6px #aaa",
                }}
              />
            )}
          />
          <div className="d-flex justify-content-between mt-2">
            <span>&#x20B9; {localValues[0]}</span>
            <span>&#x20B9; {localValues[1]}</span>
          </div>
        </div>
      )}
      {/* Category Collapse */}
      <div
        className="collapse-card mt-3"
        onClick={() => setCategoryOpen(!categoryOpen)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Category</h5>
          <img
            src={categoryOpen ? upArrowIcon : downArrowIcon}
            alt="filter icon"
            width={20}
          />
        </div>
      </div>
      {categoryOpen && (
        <div className="my-3">
          <CustomDropDown
            label=""
            name="category"
            value={localCategory}
            onChange={(item) => setLocalCategory(item)}
            placeholder="Choose a category"
            options={mapToSelectOptions(auctionCategoryList, "name", "id")}
          />
        </div>
      )}

      {/* Filter buttons */}
      <div className="filter-btn mt-4">
        <button onClick={handleApplyFilter} disabled={!isFilterBtnEnable}>
          Apply Filter
        </button>
        <button onClick={handleResetFilter} disabled={filterCount === 0}>
          Reset Filter
        </button>
      </div>
    </div>
  );
}
