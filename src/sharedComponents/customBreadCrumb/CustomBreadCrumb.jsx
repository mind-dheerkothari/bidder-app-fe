import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

export default function CustomBreadCrumb({ items = [] }) {
  return (
    <div className="custom-bread-crumb-wrapper">
      <Breadcrumb>
        {items?.map((item, index) => (
          <BreadcrumbItem key={index} active={index === items?.length - 1}>
            {index === items?.length - 1 ? (
              item?.name
            ) : (
              <Link to={item?.route}>{item?.name}</Link>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  );
}
