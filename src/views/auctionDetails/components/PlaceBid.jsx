import React, { useEffect, useState } from "react";
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
    <div className="bg-white mx-auto text-left">
      <div>
        <p className="text-[#9f3247] text-sm">
          {" "}
          Time left {getTimeLeft(auctionDetail?.end_date)} (
          {formatDate(auctionDetail?.end_date, "ddd")},{" "}
          {formatDate(auctionDetail?.end_date, "h:mm A")})
        </p>
      </div>
      <div className="flex gap-[10px] my-[15px] justify-center items-center">
        {bidAmtArr?.map((item) => (
          <button
            key={item}
            onClick={() => handleBidButtonClick(item)}
            className="bg-[linear-gradient(90deg,#7b2334,#9f3247)] text-white border-none p-[10px] rounded-[5px] text-base font-bold cursor-pointer transition-all duration-300 hover:bg-[linear-gradient(90deg,#9f3247,#7b2334)]"
          >
            Bid INR: {item}
          </button>
        ))}
      </div>
      <div className="border-b border-primary my-5"></div>
      <div>
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
          className="mt-3 w-full p-[10px] bg-primary text-white border-none rounded-[5px] text-base cursor-pointer transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:enabled:bg-[#7e2838]"
          onClick={handlePlaceBid}
        >
          Place bid
        </button>
      </div>
    </div>
  );
}
