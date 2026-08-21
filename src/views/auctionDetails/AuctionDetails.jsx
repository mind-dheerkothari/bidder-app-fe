import React, { useEffect, useState } from "react";
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
        <div className="p-10 text-primary">
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
              <div className="pl-[5px]">
                <p className="text-2xl font-bold text-black">
                  {auctionDetail?.item_name}
                </p>
                <p className="text-sm text-primary">
                  Time left {getTimeLeft(auctionDetail?.end_date)} (
                  {formatDate(auctionDetail?.end_date, "ddd")},{" "}
                  {formatDate(auctionDetail?.end_date, "h:mm A")})
                </p>
                <p className="text-[22px] font-semibold text-primary [&_span]:text-base [&_span]:text-primary">
                  RS. {auctionDetail?.base_price}
                </p>
                <p className="text-sm text-black leading-[1.6]">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: auctionDetail?.description,
                    }}
                  />
                </p>
                {/* Seller Information Section */}
                <div className="mt-[30px] p-5 rounded-[10px] border border-black">
                  <h1 className="text-[22px] font-bold text-primary mb-[10px]">
                    Seller Information
                  </h1>
                  <p className="text-sm text-secondary leading-[1.6]">
                    <strong>First Name:</strong>{" "}
                    {capitalizeFirstChar(auctionDetail?.creator?.first_name)}
                  </p>
                  <p className="text-sm text-secondary leading-[1.6]">
                    <strong>Last Name: </strong>
                    {capitalizeFirstChar(auctionDetail?.creator?.last_name)}
                  </p>
                  <p className="text-sm text-secondary leading-[1.6]">
                    <strong>Email:</strong> {auctionDetail?.creator?.email}
                  </p>
                </div>
                {shouldBidNowCTAVisible() && (
                  <div className="flex justify-start mt-[30px] gap-[30px]">
                    <Button
                      onClick={toggleModal}
                      className="!bg-brand-start !text-white text-base !p-[10px] !rounded-[5px] !border-none transition-all duration-300 !min-w-[60%] hover:!bg-[#b2496a]"
                    >
                      Bid Now
                    </Button>
                    <div className="flex w-10 h-10 rounded border border-black p-[10px] cursor-pointer text-black">
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
