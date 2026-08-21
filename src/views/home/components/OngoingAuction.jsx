import React, { useEffect } from "react";
import AuctionCard from "../../../sharedComponents/auctionCard/AuctionCard";
import { Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionListForHome } from "../../../redux/slices/auctionSlice";
import Loader from "../../../sharedComponents/loader/Loader";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "../../../utils/routeConstant";

export default function OngoingAuction() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auctionOnHome, isLoading } = useSelector((state) => state.auction);
  useEffect(() => {
    dispatch(getAuctionListForHome());
  }, []);
  const handleViewAll = ()=>{
    navigate(routeConstants.AUCTION_LIST)
  }
  return (
    <div className="ongoing-auction-wrapper">
      {
        isLoading && (
          <Loader />
        )
      }
      <div className="heading d-flex justify-content-center align-items-center">
        <h1>On Going Auction</h1>
      </div>
      <div className="p-4">
        <Row>
          {auctionOnHome?.map((item, index) => (
            <Col key={index} lg={3} md={4} sm={6} xs={12} className="mt-4">
              <AuctionCard data={item} />
            </Col>
          ))}
        </Row>
      </div>
      <div className="view-all-btn text-center">
        <button onClick={handleViewAll}>View All</button>
      </div>
    </div>
  );
}
