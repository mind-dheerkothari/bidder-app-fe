import React from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import editIcon from "../../../assets/icons/edit.svg";
import { formatDate } from "../../../utils/commonFunction";

export default function AuctionPreview({
  handelEditClick,
  createAuctionState,
}) {
  return (
    <div className="auction-preview-wrapper">
      {/* Auction Details */}
      <Card className="auction-card">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <p className="card-title">Auction Detail</p>
          <img
            src={editIcon}
            alt="Edit"
            className="edit-icon"
            onClick={() => handelEditClick(0)}
          />
        </CardHeader>
        <CardBody>
          <p className="product-name">
            Product Name: <strong>{createAuctionState?.productName}</strong>
          </p>
          <p className="base-price">
            Base Price: <strong>{createAuctionState?.basePrice}/-</strong>
          </p>
          <p className="category">
            Category: <strong>{createAuctionState?.category?.label}</strong>
          </p>
          <p className="start-date">
            Start Date:{" "}
            {formatDate(createAuctionState?.startDate, "DD-MM-YYYY hh:mm A")}
          </p>
          <p className="end-date">
            End Date:{" "}
            {formatDate(createAuctionState?.endDate, "DD-MM-YYYY hh:mm A")}{" "}
          </p>
        </CardBody>
      </Card>

      {/* Auction Description */}
      <Card className="auction-card">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <p className="card-title">Auction Description</p>
          <img
            src={editIcon}
            alt="Edit"
            className="edit-icon"
            onClick={() => handelEditClick(1)}
          />
        </CardHeader>
        <CardBody>
          <div
            dangerouslySetInnerHTML={{
              __html: createAuctionState?.description,
            }}
          />
        </CardBody>
      </Card>

      {/* Auction Photos */}
      <Card className="auction-card">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <p className="card-title">Auction Photos</p>
          <img
            src={editIcon}
            alt="Edit"
            className="edit-icon"
            onClick={() => handelEditClick(2)}
          />
        </CardHeader>
        <CardBody>
          <div className="d-flex gap-4 flex-wrap">
            {createAuctionState?.photos?.map((item) => (
              <img src={item?.url} alt="Auction" className="auction-image" />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
