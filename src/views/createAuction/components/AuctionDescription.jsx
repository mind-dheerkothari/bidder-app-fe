import React from "react";
import CustomEditor from "../../../sharedComponents/customEditor/CustomEditor";

export default function AuctionDescription({
  createAuctionState,
  setCreateAuctionState,
}) {
  const handleAuctionDescription = (value, name) => {
    setCreateAuctionState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="auction-description-wrapper">
      <CustomEditor
        label="Description"
        name="description"
        value={createAuctionState?.description}
        onChange={handleAuctionDescription}
        required={true}
        placeholder="Enter the detailed description...."
        maxLength={500}
      />
    </div>
  );
}
