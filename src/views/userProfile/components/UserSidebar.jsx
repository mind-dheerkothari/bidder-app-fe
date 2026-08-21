import React, { useState } from "react";
import { FaHome, FaGavel, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { routeConstants } from "../../../utils/routeConstant";
import ConfirmModal from "../../../sharedComponents/confirmModal/ConfirmModal";
import MyAuctionList from "./MyAuctionList";
import { capitalizeFirstChar } from "../../../utils/commonFunction";
import MyBidList from "./MyBidList";

export default function UserSidebar() {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "auctionList", label: "Auction List", icon: <FaGavel /> },
    { id: "bidList", label: "Bid List", icon: <FaGavel /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
    { id: "logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];
  const [activeTab, setActiveTab] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginUserDetails } = useSelector((state) => state.user);
  
  const toggleModal = () => setModalOpen((prev) => !prev);
  const handleConfirm = () => {
    dispatch(logout());
    toggleModal();
    navigate(routeConstants.SIGN_IN);
  };
  return (
    <div className="flex p-4 pt-2">
      <div className="w-[250px] max-h-[300px] p-5 border border-[#ddd] shadow-[0_0_20px_10px_#5f2ded05] rounded-[20px] bg-white">
        <p className="mb-5 font-bold">
          Welcome, {capitalizeFirstChar(loginUserDetails?.first_name)}{" "}
          {capitalizeFirstChar(loginUserDetails?.last_name)}
        </p>
        <div className="flex flex-col">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.id === "logout") {
                  toggleModal();
                  return;
                }
                setActiveTab(item.id);
              }}
              className={`flex items-center p-[10px] cursor-pointer rounded-lg transition-colors duration-300 hover:bg-[#e0e0e0] ${
                activeTab === item.id ? "text-[#673ab7] font-bold" : ""
              }`}
            >
              <span className="mr-[10px]">{item?.icon}</span>
              <span>{item?.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 ml-5">
        {activeTab === "dashboard" && <h1>Dashboard components</h1>}
        {activeTab === "auctionList" && <MyAuctionList />}
        {activeTab === "bidList" && <MyBidList />}
      </div>
      {modalOpen && (
        <ConfirmModal
          isOpen={modalOpen}
          toggle={toggleModal}
          title="Logout Confirmation"
          message="Are you sure want to logout?"
          confirmText="Yes"
          cancelText="Cancel"
          isWarningIconShow={true}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
