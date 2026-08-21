import React from "react";
import { GoDotFill } from "react-icons/go";
import { capitalizeFirstChar } from "../../utils/commonFunction";

const CustomBadge = ({ title, colorCode = "blue", }) => {
  const bgColor = {
    blue: {
      backColor: "#E1EEFD",
      dotColor: "#443df3",
    },
    green: {
      backColor: "#d9f0d6",
      dotColor: "#56bd4d",
    },
    red: {
      backColor: "#fee1e1",
      dotColor: "#e40707",
    },
  };

  const colors = bgColor[colorCode] || bgColor.blue;

  return (
    <div
      className="inline-flex h-6 pt-1 pr-3 pb-1 pl-2 items-center gap-[10px] rounded-2xl text-xs font-normal leading-5 w-fit"
      style={{ backgroundColor: colors.backColor }}
    >
      <GoDotFill color={colors.dotColor} />
      {capitalizeFirstChar(title)}
    </div>
  );
};

export default CustomBadge;
