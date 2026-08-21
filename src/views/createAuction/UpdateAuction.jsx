import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAuctionDetailById } from "../../redux/slices/auctionSlice";
import AuctionIndex from "./components/AuctionIndex";
import { routeConstants } from "../../utils/routeConstant";

export default function UpdateAuction() {
  const { auction_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auctionDetail } = useSelector((state) => state.auction);
  const { loginUserDetails } = useSelector((state) => state.user);

  useEffect(() => {
    if (auction_id) {
      dispatch(getAuctionDetailById(auction_id));
    }
  }, [auction_id]);

  useEffect(() => {
    if (
      loginUserDetails?.id !== auctionDetail?.creator?.id &&
      auction_id == auctionDetail?.id
    ) {
      // TODO: Route should
      navigate(routeConstants.HOME_PAGE);
    }
  }, [auctionDetail, auction_id]);
  
  return (
    <div className="h-[calc(100vh-80px)] bg-[#f2f0f1] p-10">
      <AuctionIndex auctionData={auctionDetail} />
    </div>
  );
}
