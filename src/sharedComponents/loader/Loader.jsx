import React from "react";

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-[9999999999999999]">
      <div className="w-[50px] h-[50px] border-[5px] border-l-[#ccc] border-r-[#ccc] border-b-[#ccc] border-t-[#7b2334] rounded-full animate-spin"></div>
    </div>
  );
}
