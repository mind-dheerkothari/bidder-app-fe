import React, { useRef } from "react";
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
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center bg-brand-start rounded-[20px] p-4">
        <div
          className="group relative w-[150px] h-[150px] rounded-full overflow-hidden cursor-pointer transition duration-300 border-2 border-white bg-white"
          onClick={handleFileClick}
        >
          {/* <img src={userProfile} alt="User Profile" className="w-full h-full object-cover rounded-full transition duration-300" /> */}
          <CustomAvatar firstName={loginUserDetails?.first_name} lastName={loginUserDetails?.last_name} />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-full">
            <FaCamera className="text-white h-[25px]" />
          </div>
          <input
            type="file"
            hidden
            accept=".jpg,.jpeg,.png"
            ref={inputRef}
            onChange={handleFileChange}
          />
        </div>
        <button
          className="flex justify-center items-center h-10 p-[10px] text-white border-2 border-white rounded-lg text-base cursor-pointer transition-colors duration-300 bg-transparent font-medium hover:bg-white hover:text-black"
          onClick={handleCreateAuction}
        >
          Create Auction
          <FaArrowRight className="ms-2" />
        </button>
      </div>
    </div>
  );
}
