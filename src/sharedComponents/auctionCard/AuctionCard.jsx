import React from "react";
import { Card, CardBody, CardTitle, CardText, Badge } from "reactstrap";
import "./auctionCard.scss";
import {
  formatDate,
  getTimeLeft,
  truncateText,
} from "../../utils/commonFunction";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "../../utils/routeConstant";

export default function AuctionCard({ data }) {
  const navigate = useNavigate();

  const handleRedirection = () => {
    navigate(`${routeConstants.AUCTION_DETAIL}/${data?.id}`);
  };
  return (
    <Card
      className="auction-card p-1 cursor-pointer"
      onClick={handleRedirection}
    >
      <div className="image-container">
        <img
          src="https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q="
          alt=""
          className="auction-image"
        />
        <Badge className="category-badge" color="red">
          {data?.category?.name}
        </Badge>
      </div>
      <CardBody>
        <CardTitle tag="h5" className="product-name">
          {truncateText(data?.item_name, 50)}
        </CardTitle>
        <CardText className="price-bids d-flex justify-content-between mt-2">
          <div className="d-flex justify-content-center align-items-center">
            <p className="price m-0 ">Rs. {data?.base_price}</p>
            {/* <p className="bids m-0 mx-2">(2 bids)</p> */}
          </div>
          <span className="seller">
            ({data?.creator?.first_name} {data?.creator?.last_name})
          </span>
        </CardText>
        <CardText className="time-left">
          Time left {getTimeLeft(data?.end_date)}{" "}
          <p className="end-time m-0">
            ({formatDate(data?.end_date, "h:mm A")})
          </p>
        </CardText>
      </CardBody>
    </Card>
  );
}
