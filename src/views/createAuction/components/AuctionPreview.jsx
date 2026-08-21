import React from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import editIcon from "../../../assets/icons/edit.svg";
import { formatDate } from "../../../utils/commonFunction";

export default function AuctionPreview({
  handelEditClick,
  createAuctionState,
}) {
  return (
    <div className="p-4">
      {/* Auction Details */}
      <Card className="mb-6 rounded-xl">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <p className="font-bold m-0">Auction Detail</p>
          <img
            src={editIcon}
            alt="Edit"
            className="w-5 h-5 cursor-pointer"
            onClick={() => handelEditClick(0)}
          />
        </CardHeader>
        <CardBody className="[&>p]:my-[0.3rem] [&_strong]:text-[#333]">
          <p>
            Product Name: <strong>{createAuctionState?.productName}</strong>
          </p>
          <p>
            Base Price: <strong>{createAuctionState?.basePrice}/-</strong>
          </p>
          <p>
            Category: <strong>{createAuctionState?.category?.label}</strong>
          </p>
          <p>
            Start Date:{" "}
            {formatDate(createAuctionState?.startDate, "DD-MM-YYYY hh:mm A")}
          </p>
          <p>
            End Date:{" "}
            {formatDate(createAuctionState?.endDate, "DD-MM-YYYY hh:mm A")}{" "}
          </p>
        </CardBody>
      </Card>

      {/* Auction Description */}
      <Card className="mb-6 rounded-xl">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <p className="font-bold m-0">Auction Description</p>
          <img
            src={editIcon}
            alt="Edit"
            className="w-5 h-5 cursor-pointer"
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
      <Card className="mb-6 rounded-xl">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <p className="font-bold m-0">Auction Photos</p>
          <img
            src={editIcon}
            alt="Edit"
            className="w-5 h-5 cursor-pointer"
            onClick={() => handelEditClick(2)}
          />
        </CardHeader>
        <CardBody>
          <div className="d-flex gap-4 flex-wrap">
            {createAuctionState?.photos?.map((item) => (
              <img
                src={item?.url}
                alt="Auction"
                className="w-full h-auto max-w-[200px] max-h-[200px] rounded-lg object-cover bg-[#f5f5f5]"
              />
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
