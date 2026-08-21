import React from "react";
import UserHeader from "./components/UserHeader";
import UserSidebar from "./components/UserSidebar";
export default function UserProfile() {
  return (
    <div className="bg-[#f2f0f1]">
      <UserHeader />
      <UserSidebar />
    </div>
  );
}
