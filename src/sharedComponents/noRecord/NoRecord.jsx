import React from "react";
import noRecord from "../../assets/icons/no_record_found.svg";

export default function NoRecord() {
  return (
    <div className="flex justify-center items-center w-full h-full overflow-hidden">
      <img src={noRecord} alt="" className="max-w-full max-h-full object-contain" />
    </div>
  );
}
