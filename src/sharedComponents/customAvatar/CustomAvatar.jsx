import React from "react";

export default function CustomAvatar({
  firstName,
  lastName,
  size = 100,
  bgColor = "#3498db",
  textColor = "white",
  className = "w-100 h-100",
}) {
  let initials = "";

  if (firstName && lastName) {
    initials = `${firstName[0].toUpperCase()} ${lastName[0].toUpperCase()}`;
  } else {
    initials = firstName?.slice(0, 2).toUpperCase();
  }

  const style = {
    backgroundColor: bgColor,
    color: textColor,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: size / 2.5,
    fontWeight: "bold",
    userSelect: "none",
  };
  return (
    <div style={style} className={className}>
      {initials}
    </div>
  );
}
