import React from "react";
import "./userProfile.scss";
import UserHeader from "./components/UserHeader";
import UserSidebar from "./components/UserSidebar";
export default function UserProfile() {
  return (
    <div className="user-profile-wrapper">
      <UserHeader />
      <UserSidebar />
    </div>
  );
}
