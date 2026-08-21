import React, { useEffect, useState } from "react";
import "./auctionDetail.scss";
import { Row, Button, Col } from "reactstrap";
import heartIcon from "../../assets/icons/heart.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionDetailById } from "../../redux/slices/auctionSlice";
import { useParams } from "react-router-dom";
import {
  capitalizeFirstChar,
  formatDate,
  getTimeLeft,
} from "../../utils/commonFunction";
import NoRecord from "../../sharedComponents/noRecord/NoRecord";
import CustomModal from "../../sharedComponents/customModal/CustomModal";
import { CONSTANT_NAME } from "../../utils/propertyResolver";
import PlaceBid from "./components/PlaceBid";
import Loader from "../../sharedComponents/loader/Loader";
import CustomSlider from "../../sharedComponents/customSlider/CustomSlider";
import CustomBreadCrumb from "../../sharedComponents/customBreadCrumb/CustomBreadCrumb";
import { routeConstants } from "../../utils/routeConstant";

export default function AuctionDetails() {
  const [isPlaceModalShow, setIsPlaceModalShow] = useState(false);
  const dispatch = useDispatch();
  const { auction_id } = useParams();
  const { auctionDetail, isLoading } = useSelector((state) => state.auction);
  const { loginUserDetails } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAuctionDetailById(auction_id));
  }, [auction_id]);

  const toggleModal = () => setIsPlaceModalShow(!isPlaceModalShow);

  const shouldBidNowCTAVisible = () => {
    if (
      auctionDetail?.status !== "active" ||
      auctionDetail?.creator?.id === loginUserDetails?.id
    ) {
      return false;
    }
    return true;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !auctionDetail && !isLoading ? (
        <div style={{ height: "80vh" }}>
          <NoRecord />
        </div>
      ) : (
        <div className="auction-detail-wrapper">
          <CustomBreadCrumb
            items={[
              { name: "Home", route: routeConstants.HOME_PAGE },
              { name: "Auction", route: routeConstants.SIGN_IN },
              { name: "Auction Detail", route: routeConstants.AUCTION_DETAIL },
            ]}
          />
          <Row>
            <Col md={6}>
              <CustomSlider
                dataList={auctionDetail?.images?.map((item) => item?.url)}
              />
            </Col>
            {/* Details take 50% width */}
            <Col md={6}>
              <div className="auction-details">
                <p className="heading">{auctionDetail?.item_name}</p>
                <p className="time-left">
                  Time left {getTimeLeft(auctionDetail?.end_date)} (
                  {formatDate(auctionDetail?.end_date, "ddd")},{" "}
                  {formatDate(auctionDetail?.end_date, "h:mm A")})
                </p>
                <p className="price">RS. {auctionDetail?.base_price}</p>
                <p className="auction-info">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: auctionDetail?.description,
                    }}
                  />
                </p>
                {/* Seller Information Section */}
                <div className="seller-info">
                  <h1>Seller Information</h1>
                  <p>
                    <strong>First Name:</strong>{" "}
                    {capitalizeFirstChar(auctionDetail?.creator?.first_name)}
                  </p>
                  <p>
                    <strong>Last Name: </strong>
                    {capitalizeFirstChar(auctionDetail?.creator?.last_name)}
                  </p>
                  <p>
                    <strong>Email:</strong> {auctionDetail?.creator?.email}
                  </p>
                </div>
                {shouldBidNowCTAVisible() && (
                  <div className="bid-now-btn">
                    <Button onClick={toggleModal}>Bid Now</Button>
                    <div className="save-draft">
                      <img src={heartIcon} alt="save" />
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
      )}
      {isPlaceModalShow && (
        <CustomModal
          isOpen={isPlaceModalShow}
          toggle={toggleModal}
          title={CONSTANT_NAME.PLACE_YOUR_BID}
        >
          <PlaceBid auctionDetail={auctionDetail} toggleModal={toggleModal} />
        </CustomModal>
      )}
    </>
  );
}
