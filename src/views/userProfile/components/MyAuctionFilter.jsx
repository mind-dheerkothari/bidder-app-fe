import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import MultiSelectionFilter from "../../../sharedComponents/multiSelectionFilter/MultiSelectionFilter";
import { mapToSelectOptions } from "../../../utils/commonFunction";
import { CONSTANT_NAME } from "../../../utils/propertyResolver";
import CustomDatePicker from "../../../sharedComponents/customDatePicker/CustomDatePicker";
import CustomInput from "../../../sharedComponents/customInput/CustomInput";
import useDebounce from "../../../customHooks/useDebounce";

export default function MyAuctionFilter({
  filterState,
  handleApply,
  auctionCategoryList,
}) {
  const [searchInput, setSearchInput] = useState(filterState?.search || "");
  const debouncedSearch = useDebounce(searchInput, 500);
  useEffect(() => {
    handleApply(debouncedSearch, "search");
  }, [debouncedSearch]);
  return (
    <Row className="mb-3">
      <Col xs="12" sm="6" md="4" lg="3" xl="2">
        <MultiSelectionFilter
          label="Categories"
          options={mapToSelectOptions(auctionCategoryList, "name", "id")}
          value={filterState?.categories || []}
          onApply={(selected) => handleApply(selected, "categories")}
          disabled={false}
        />
      </Col>
      <Col xs="12" sm="6" md="4" lg="3" xl="2">
        <MultiSelectionFilter
          label="Status"
          options={CONSTANT_NAME.AUCTION_STATUS_LIST}
          value={filterState?.status || []}
          onApply={(selected) => handleApply(selected, "status")}
          disabled={false}
          isSearchable={false}
        />
      </Col>
      <Col xs="12" sm="6" md="4" lg="3">
        <CustomDatePicker
          value={filterState?.dateRange}
          onChange={(date) => {
            handleApply(date, "dateRange");
          }}
          placeholder="Pick auction start and end dates"
          required
          mode="range"
          format="DD/MM/YYY hh:mm A"
          withTime={true}
        />
      </Col>
      <Col xs="12" sm="6" md="4" lg="3">
        <CustomInput
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          placeholder="Search by item name"
        />
      </Col>
    </Row>
  );
}
