import React, { useRef } from "react";
import "./userHeader.scss";
import userProfile from "../../../assets/icons/warning.svg";
import { FaCamera, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "../../../utils/routeConstant";
import { CONSTANT_NAME, ERROR_MESSAGE } from "../../../utils/propertyResolver";
import { showToast } from "../../../sharedComponents/toast/showTaost";
import CustomAvatar from "../../../sharedComponents/customAvatar/CustomAvatar";
import { useSelector } from "react-redux";
export default function UserHeader() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { loginUserDetails } = useSelector((state) => state.user);

  const handleCreateAuction = () => {
    navigate(routeConstants.AUCTION_CREATE);
  };
  const handleFileClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const isValidType = CONSTANT_NAME.PROFILE_PHOTO_VALIDATION.includes(
        file.type
      );
      if (!isValidType) {
        showToast(`${file.name} is not a valid file type.`, "warning");
        return;
      }
      const isValidSize = CONSTANT_NAME.PROFILE_PHOTO_MAX_SIZE > file.size;
      if (!isValidSize) {
        showToast(`${file.name} is too large.`, "warning");
        return;
      }

      // File is valid
      //TODO: Upload this file on aws
    } catch (error) {
      console.log(error);
      showToast(error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG, "error");
    }

    e.target.value = "";
  };
  return (
    <div className="user-header-wrapper p-4">
      <div className="d-flex justify-content-between align-items-center header-bg p-4">
        <div className="profile-pic-wrapper" onClick={handleFileClick}>
          {/* <img src={userProfile} alt="User Profile" className="profile-pic" /> */}
          <CustomAvatar firstName={loginUserDetails?.first_name} lastName={loginUserDetails?.last_name} />
          <div className="overlay">
            <FaCamera className="camera-icon" />
          </div>
          <input
            type="file"
            hidden
            accept=".jpg,.jpeg,.png"
            ref={inputRef}
            onChange={handleFileChange}
          />
        </div>
        <button className="create-auction-btn" onClick={handleCreateAuction}>
          Create Auction
          <FaArrowRight className="arrow-icon ms-2" />
        </button>
      </div>
    </div>
  );
}
