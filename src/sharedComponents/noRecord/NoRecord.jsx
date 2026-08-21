import React from "react";
import noRecord from "../../assets/icons/no_record_found.svg";
import "./noRecord.scss";

export default function NoRecord() {
  return (
    <div className="no-records">
      <img src={noRecord} alt="" />
    </div>
  );
}
