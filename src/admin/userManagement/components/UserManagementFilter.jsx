import React, { useState } from "react";
import DynamicFilterRenderer from "../../../sharedComponents/dynamicFilter/DynamicFilter";
import { CONSTANT_NAME, USER_ROLE } from "../../../utils/propertyResolver";
import { useSelector } from "react-redux";
import { Button, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "../../../utils/routeConstant";

export default function UserManagementFilter({
  handleApply,
  filterState,
  handleReset,
}) {
  const { loginUserDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const filterConfig = [
    {
      type: "multi",
      label: "Roles",
      key: "role",
      value: filterState?.role,
      options: CONSTANT_NAME.USER_ROLE_LIST?.filter(
        (item) =>
          !(
            loginUserDetails?.role_id === USER_ROLE.ADMIN &&
            item?.label === "Admin"
          )
      ),
      isSearchable: false,
    },
    {
      type: "multi",
      label: "Status",
      key: "status",
      value: filterState?.status,
      options: CONSTANT_NAME.USER_STATUS_LIST,
      isSearchable: false,
    },
    {
      type: "input",
      label: "Search",
      key: "search",
      value: filterState?.search,
      placeholder: "Search by user name / email",
    },
    {
      type: "reset",
      label: "Reset",
    },
  ];

  return (
    <>
      <Row>
        <Col md={11}>
          <DynamicFilterRenderer
            configList={filterConfig}
            handleApply={handleApply}
            handleReset={handleReset}
          />
        </Col>
        <Col md={1}>
          <Button onClick={()=>navigate(routeConstants.ADMIN_USER_CREATE)}>Create User</Button>
        </Col>
      </Row>
    </>
  );
}
