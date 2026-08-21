import React from "react";
import { Col, Row } from "reactstrap";
import CustomInput from "../../../sharedComponents/customInput/CustomInput";
import CustomDropDown from "../../../sharedComponents/customDropDown/CustomDropDown";
import CustomDatePicker from "../../../sharedComponents/customDatePicker/CustomDatePicker";
import { DateObject } from "react-multi-date-picker";

export default function AuctionDetails({
  createAuctionState,
  setCreateAuctionState,
  handleChange,
  auctionCategoryList,
}) {
  const handleCategoryAndDateChange = (value, name) => {
    setCreateAuctionState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Handle min date for end date of auction it should always grater than to start date
  const minDate = createAuctionState?.startDate
    ? new DateObject({
        date: createAuctionState?.startDate,
        format: "YYYY-MM-DDTHH:mm:ssZ",
      })
    : new DateObject();
  return (
    <div className="auction-detail-wrapper">
      <Row>
        <Col md={6}>
          <CustomInput
            label={"Product Name"}
            name="productName"
            placeholder="Enter product name"
            value={createAuctionState?.productName}
            onChange={handleChange}
            required={true}
            validationRegex="^(?! )[a-zA-Z0-9 ]*$"
          />
        </Col>
        <Col md={6}>
          <CustomInput
            label={"Base Price"}
            name="basePrice"
            placeholder="Enter base price"
            value={createAuctionState?.basePrice}
            onChange={handleChange}
            required={true}
            validationRegex="^[1-9][0-9]*$"
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <CustomDropDown
            label="Select a Category"
            name="category"
            value={createAuctionState?.category}
            onChange={handleCategoryAndDateChange}
            placeholder="Choose a category"
            required
            options={auctionCategoryList || []}
          />
        </Col>
        <Col md={6}>
          <CustomDatePicker
            label="Start Date"
            name="startDate"
            value={createAuctionState?.startDate}
            onChange={handleCategoryAndDateChange}
            placeholder="Pick start date"
            required
            mode="single"
            format="DD/MM/YYYY hh:mm A"
            minDate={new Date()}
            withTime
          />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <CustomDatePicker
            label="End Date"
            name="endDate"
            value={createAuctionState?.endDate}
            onChange={handleCategoryAndDateChange}
            placeholder="Pick end date"
            required
            mode="single"
            format="DD/MM/YYYY hh:mm A"
            minDate={minDate}
            withTime
          />
        </Col>
      </Row>
    </div>
  );
}
