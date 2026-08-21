import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccount } from "../../redux/slices/authSlice";
import greenTick from "../../assets/icons/green_tick.svg";
import { routeConstants } from "../../utils/routeConstant";

export default function VerifyAccount() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isAccountVerified } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate(routeConstants.SIGN_IN);
    } else {
      dispatch(verifyAccount(token));
    }
  }, [token]);

  return (
    <div className="verify-account-wrapper">
      <div className="card">
        {isLoading ? (
          <h2 className="loading-text">Verifying your account...</h2>
        ) : isAccountVerified ? (
          <>
            <div className="d-flex justify-content-center">
              <img src={greenTick} alt="Account Verified" />
            </div>
            <h2>Account Verified!</h2>
            <p>
              Your account has been successfully verified. You can now sign in.
            </p>
            <button
              onClick={() => navigate(routeConstants.SIGN_IN)}
              className="btn-primary"
            >
              Go to Sign In
            </button>
          </>
        ) : (
          <>
            <h2>Invalid Verification Link</h2>
            <p>Please request a new verification email.</p>
            <button
              onClick={() => navigate(routeConstants.FORGOT_PASSWORD)}
              className="btn-secondary"
            >
              Resend Email
            </button>
          </>
        )}
      </div>
    </div>
  );
}
