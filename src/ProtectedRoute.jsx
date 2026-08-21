import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { routeConstants } from "./utils/routeConstant";

export default function ProtectedRoute({ allowedRoles }) {
  // is user login
  const isAuthenticated = useSelector((state) => state.auth.isUserLogin);
  if (!isAuthenticated) {
    return <Navigate to={routeConstants.SIGN_IN} replace />;
  }

  // current login user rule
  const userRole = "admin";

  if (!allowedRoles?.includes(userRole)) {
    return <Navigate to={routeConstants.PERMISSION_DENIED} replace />;
  }

  return <Outlet />;
}
