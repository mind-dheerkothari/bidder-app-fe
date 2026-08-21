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
    <div className="p-4">
      {isLoading && <Loader />}
      <Col md="12">
        <h4 className="text-xl font-semibold text-primary mb-5">
          Bids for Auction #{params?.auction_id}~
          {auctionBidList?.auction?.item_name}
        </h4>

        <Row>
          {auctionBidList?.bids?.map((bid) => (
            <Col md="6" lg="3" key={bid?.id} className="mb-4">
              <Card className="shadow-sm h-100 !rounded-2xl !border !border-[#e5e3e4] !bg-white transition-all duration-200 hover:!-translate-y-1 hover:!shadow-[0_6px_14px_rgba(0,0,0,0.08)] hover:!border-[#d1cfd0]">
                <CardBody className="!p-5">
                  {/* Bidder Info */}
                  <div className="flex items-center mb-[15px]">
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
                      <h6 className="mb-0 text-base font-medium text-primary">
                        {capitalizeFirstChar(bid?.bidder?.first_name)}{" "}
                        {bid?.bidder?.last_name}
                      </h6>
                      <small className="text-[13px] text-secondary">{bid?.bidder?.email}</small>
                    </div>
                  </div>

                  {/* Bid Details */}
                  <div className="mb-3 [&_strong]:font-medium [&_strong]:text-secondary [&_span]:font-semibold [&_span]:text-primary">
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
                  <div className="flex justify-between gap-[10px]">
                    <Button
                      color="success"
                      size="sm"
                      disabled={bid?.bid_status !== "pending"}
                      onClick={()=>handleActionClick(bid, "approve")}
                      className="flex-1 !rounded-[30px] !text-sm !font-medium !py-2 !px-0 transition-all duration-200 disabled:cursor-not-allowed !bg-brand-gradient !border-none hover:!bg-[linear-gradient(89.28deg,#6a1f2d_5.99%,#9f3247_94.17%)]"
                    >
                      Approve
                    </Button>
                    <Button
                      color="danger"
                      size="sm"
                      disabled={bid?.bid_status !== "pending"}
                      onClick={()=>handleActionClick(bid, "reject")}
                      className="flex-1 !rounded-[30px] !text-sm !font-medium !py-2 !px-0 transition-all duration-200 disabled:cursor-not-allowed !bg-[#ef4444] !border-none hover:!bg-[#d63d3d]"
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
