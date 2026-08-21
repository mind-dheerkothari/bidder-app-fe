import React from "react";
import { Col, Row } from "reactstrap";
import MultiSelectionFilter from "../../../sharedComponents/multiSelectionFilter/MultiSelectionFilter";
import { CONSTANT_NAME } from "../../../utils/propertyResolver";

export default function MyBidFilter({ filterState, handleApply }) {
  return (
    <Row className="mb-3">
      <Col xs="12" sm="6" md="4" lg="3" xl="2">
        <MultiSelectionFilter
          label="Status"
          options={CONSTANT_NAME.BID_STATUS_LIST}
          value={filterState?.status || []}
          onApply={(selected) => handleApply(selected, "status")}
          disabled={false}
          isSearchable={false}
        />
      </Col>
    </Row>
  );
}
