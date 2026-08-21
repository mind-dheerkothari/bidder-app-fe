import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
} from "reactstrap";
import "./auctionBids.scss";
import CustomBadge from "../../sharedComponents/customBadge/CustomBadge";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBidListByAuctionId } from "../../redux/slices/bidSlice";
import Loader from "../../sharedComponents/loader/Loader";
import { capitalizeFirstChar, formatDate } from "../../utils/commonFunction";
import CustomAvatar from "../../sharedComponents/customAvatar/CustomAvatar";
import NoRecord from "../../sharedComponents/noRecord/NoRecord";
import ConfirmModal from "../../sharedComponents/confirmModal/ConfirmModal";

export default function AuctionBids() {
  const params = useParams();
  const dispatch = useDispatch();
  const { auctionBidList, isLoading } = useSelector((state) => state.bid);
  const [isConfirmationShow, setIsConfirmationShow] = useState(false);
  const [selectedBid, setSelectedBid] = useState(null);
  const [actionType, setActionType] = useState("") //approve || reject

  useEffect(() => {
    if (params.auction_id) {
      dispatch(getBidListByAuctionId(params.auction_id));
    }
  }, [params?.auction_id]);

  const toggleModal = () => setIsConfirmationShow(!isConfirmationShow);

  const handleActionClick = (bid, type)  =>{
    setSelectedBid(bid);
    setActionType(type);
    setIsConfirmationShow(true)
  }

  const handleConfirm = ()=>{
    if(actionType === "approve"){
      //
    }else{

    }
    toggleModal()
  }
  return (
    <div className="auction-bids-wrapper p-4">
      {isLoading && <Loader />}
      <Col md="12">
        <h4 className="mb-4">
          Bids for Auction #{params?.auction_id}~
          {auctionBidList?.auction?.item_name}
        </h4>

        <Row>
          {auctionBidList?.bids?.map((bid) => (
            <Col md="6" lg="3" key={bid?.id} className="mb-4">
              <Card className="shadow-sm h-100">
                <CardBody>
                  {/* Bidder Info */}
                  <div className="bidder-info">
                    {/* <img
                      src={bid.bidder.avatar}
                      alt=""
                      className="rounded-circle me-3"
                    /> */}
                    <CustomAvatar
                      firstName={bid?.bidder?.first_name}
                      lastName={bid?.bidder?.last_name}
                      className="rounded-circle me-3"
                    />
                    <div>
                      <h6 className="mb-0">
                        {capitalizeFirstChar(bid?.bidder?.first_name)}{" "}
                        {bid?.bidder?.last_name}
                      </h6>
                      <small className="text-muted">{bid?.bidder?.email}</small>
                    </div>
                  </div>

                  {/* Bid Details */}
                  <div className="bid-details">
                    <div>
                      <strong>Bid Amount:</strong>{" "}
                      <span>&#8377; {bid?.bid_amount}</span>
                    </div>
                    <div>
                      <strong>Placed At:</strong>{" "}
                      <span>{formatDate(bid?.crated_at, "DD-MMM-YYYY")}</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-3">
                    <CustomBadge
                      title={bid?.bid_status}
                      colorCode={
                        bid?.bid_status === "accepted" ? "green" : "red"
                      }
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <Button
                      color="success"
                      size="sm"
                      disabled={bid?.bid_status !== "pending"}
                      onClick={()=>handleActionClick(bid, "approve")}
                    >
                      Approve
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      disabled={bid?.bid_status !== "pending"}
                      onClick={()=>handleActionClick(bid, "reject")}
                    >
                      Reject
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
          {auctionBidList?.bids?.length === 0 && (
            <div style={{ height: "800px" }}>
              <NoRecord />
            </div>
          )}
        </Row>
      </Col>
      {
        isConfirmationShow && (
          <ConfirmModal
            isOpen={isConfirmationShow}
            toggle={toggleModal}
            title="Confirm Action"
            message={`Are you sure want to ${actionType} this bid of ₹${selectedBid?.bid_amount}`}
            isWarningIconShow={true}
            confirmText="Yes, Confirm"
            cancelText="Cancel"
            onConfirm={handleConfirm}
          />
        )
      }
    </div>
  );
}
