import { useDispatch, useSelector } from "react-redux";
import "./style/index.css";
import { useEffect } from "react";
import { fetchTestData } from "./redux/slices/testSlice";
import Signup from "./views/auth/Signup";
import Signin from "./views/auth/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./views/auth/ForgotPassword";
import VerifyAccount from "./views/auth/VerifyAccount";
import ResetPassword from "./views/auth/ResetPassword";
import { routeConstants } from "./utils/routeConstant";
import Header from "./views/header/Header";
import Home from "./views/home/Home";
import AuctionDetails from "./views/auctionDetails/AuctionDetails";
import CreateAuction from "./views/createAuction/CreateAuction";
import ProtectedRoute from "./ProtectedRoute";
import AuctionList from "./views/auctionList/AuctionList";
import UserProfile from "./views/userProfile/UserProfile";
import UpdateAuction from "./views/createAuction/UpdateAuction";
import { USER_ROLE } from "./utils/propertyResolver";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import AuctionManagement from "./admin/auctionManagement/AuctionManagement";
import UserCreate from "./admin/userManagement/UserCreate";
import UserManagement from "./admin/userManagement/UserManagement";
import UserView from "./admin/userManagement/components/UserView";
import UserUpdate from "./admin/userManagement/components/UserUpdate";
import AuctionBids from "./views/auctionBids/AuctionBids";
function App() {
  const userRole = useSelector((state)=>state.user?.loginUserDetails?.role_id);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Admin routes */}
          {[USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN].includes(userRole) && (
            <Route element={<AdminLayout />}>
              <Route path={routeConstants.SIGN_UP} element={<Signup />} />
              <Route path={routeConstants.ADMIN_AUCTION_LIST} element={<AuctionManagement />} />
              <Route path={routeConstants.ADMIN_USER_CREATE} element={<UserCreate />} />
              <Route path={routeConstants.ADMIN_USER_LIST} element={<UserManagement />} />
              <Route path={`${routeConstants.ADMIN_USER_VIEW}/:id`} element={<UserView />} />
              <Route path={`${routeConstants.ADMIN_USER_EDIT}/:id`} element={<UserUpdate />} />
            </Route>
          )}

          {/* normal user route */}
          <Route element={<UserLayout />}>
            <Route path={routeConstants.HOME_PAGE} element={<Home />} />
            <Route path={routeConstants.SIGN_UP} element={<Signup />} />
            <Route path={routeConstants.SIGN_IN} element={<Signin />} />
            <Route
              path={routeConstants.FORGOT_PASSWORD}
              element={<ForgotPassword />}
            />
            <Route
              path={routeConstants.VERIFY_ACCOUNT}
              element={<VerifyAccount />}
            />
            <Route
              path={routeConstants.RESET_PASSWORD}
              element={<ResetPassword />}
            />
            <Route
              path={`${routeConstants.AUCTION_DETAIL}/:auction_id`}
              element={<AuctionDetails />}
            />
            <Route
              path={`${routeConstants.AUCTION_LIST}`}
              element={<AuctionList />}
            />

            <Route
              path={routeConstants.USER_PROFILE}
              element={<UserProfile />}
            />
            <Route
              path={`${routeConstants.AUCTION_UPDATE}/:auction_id`}
              element={<UpdateAuction />}
            />
             <Route
              path={`${routeConstants.AUCTION_BID_LIST}/:auction_id`}
              element={<AuctionBids />}
            />
            {/* Protected routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["admin", "super-admin"]} />
              }
            >
              <Route
                path={routeConstants.AUCTION_CREATE}
                element={<CreateAuction />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
