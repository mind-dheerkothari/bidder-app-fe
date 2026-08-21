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
    <div className="min-h-screen flex justify-center items-center bg-[#f3f4f6] p-4">
      <div className="bg-white rounded-2xl p-8 max-[480px]:p-6 w-full max-w-[400px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] text-center transition-all duration-300">
        {isLoading ? (
          <h2 className="text-xl font-semibold text-[#4b5563] mt-4">
            Verifying your account...
          </h2>
        ) : isAccountVerified ? (
          <>
            <div className="d-flex justify-content-center">
              <img
                src={greenTick}
                alt="Account Verified"
                className="w-16 h-16 object-contain mb-4 mx-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#1f2937] mt-4 max-[480px]:text-xl">
              Account Verified!
            </h2>
            <p className="text-base text-[#6b7280] mt-2 leading-[1.5] max-[480px]:text-sm">
              Your account has been successfully verified. You can now sign in.
            </p>
            <button
              onClick={() => navigate(routeConstants.SIGN_IN)}
              className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white px-6 py-3 rounded-lg text-base font-semibold mt-6 cursor-pointer transition-colors duration-200"
            >
              Go to Sign In
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#1f2937] mt-4 max-[480px]:text-xl">
              Invalid Verification Link
            </h2>
            <p className="text-base text-[#6b7280] mt-2 leading-[1.5] max-[480px]:text-sm">
              Please request a new verification email.
            </p>
            <button
              onClick={() => navigate(routeConstants.FORGOT_PASSWORD)}
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-6 py-3 rounded-lg text-base font-semibold mt-6 cursor-pointer transition-colors duration-200"
            >
              Resend Email
            </button>
          </>
        )}
      </div>
    </div>
  );
}
