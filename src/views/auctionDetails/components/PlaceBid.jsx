import React, { useEffect, useState } from "react";
import "./placeBid.scss";
import CustomInput from "../../../sharedComponents/customInput/CustomInput";
import { formatDate, getTimeLeft } from "../../../utils/commonFunction";
import { useDispatch, useSelector } from "react-redux";
import { placeBid } from "../../../redux/slices/auctionSlice";

export default function PlaceBid({ auctionDetail, toggleModal }) {
  const [bidAmtArr, setBidAmtArr] = useState([]);
  const [bidValue, setBidValue] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auction);

  const handleBidChange = (e) => {
    const input = e.target.value;

    // Allow empty input for deletion, otherwise enforce number validation
    if (input === "" || /^[1-9]\d*$/.test(input)) {
      const numValue = Number(input);
      if (input !== "" && numValue < auctionDetail?.base_price) {
        setError(`Bid must be greater than INR ${auctionDetail?.base_price}`);
      } else {
        setError("");
      }
      setBidValue(numValue);
    }
  };

  const generateRandomAmt = (baseAmt) => {
    const newAmt = new Set();
    while (newAmt.size < 3) {
      const randomAmount = Math.floor(Math.random() * 100) + baseAmt + 1; // Ensure it's greater than the baseAmt
      newAmt.add(randomAmount);
    }
    setBidAmtArr([...newAmt]);
  };

  const handleBidButtonClick = (amount) => {
    if (amount >= auctionDetail?.base_price) {
      setBidValue(amount);
      setError("");
    } else {
      setError(`Bid must be greater than INR ${auctionDetail?.base_price}`);
    }
  };

  const handlePlaceBid = async () => {
    try {
      const payload = {
        auction_id: auctionDetail?.id,
        bid_amount: bidValue,
      };
      await dispatch(placeBid(payload)).unwrap();
      toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    generateRandomAmt(auctionDetail?.base_price);
  }, [auctionDetail?.base_price]);
  return (
    <div className="place-bid-wrapper">
      <div className="heading">
        <p>
          {" "}
          Time left {getTimeLeft(auctionDetail?.end_date)} (
          {formatDate(auctionDetail?.end_date, "ddd")},{" "}
          {formatDate(auctionDetail?.end_date, "h:mm A")})
        </p>
      </div>
      <div className="bid-price-btn">
        {bidAmtArr?.map((item) => (
          <button key={item} onClick={() => handleBidButtonClick(item)}>
            Bid INR: {item}
          </button>
        ))}
      </div>
      <div className="divider"></div>
      <div className="bid-form">
        <CustomInput
          label="Your max bid"
          name="your-bid"
          value={bidValue}
          placeholder="Enter your bid"
          required={true}
          onChange={handleBidChange}
          error={error}
        />
        <button
          disabled={!bidValue || error || isLoading}
          className="mt-3"
          onClick={handlePlaceBid}
        >
          Place bid
        </button>
      </div>
    </div>
  );
}
