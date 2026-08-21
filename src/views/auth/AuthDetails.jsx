import React from "react";
import { Link } from "react-router-dom";

export default function AuthDetails({ formType }) {
  const signUpText = `Create an account to dive into the world of auctions and unveil hidden
          treasures. As a member of Bidbuyy, you'll gain exclusive access to bid
          on unique, one-of-a-kind items, from vintage gems to intriguing
          antiques. Don't miss out on the excitement – sign up now and embark on
          a journey where every bid is a step closer to uncovering extraordinary
          finds! Join the auction adventure today!`;
  const signInText = `
          Welcome back! We're thrilled to see you again. Log in to Bidbuyy and resume your journey into the world of exclusive auctions. Your next winning bid could be just a click away. Happy bidding!
          `;
  const forgotPasswordText = `
          Forgot your password? No worries! Enter your email address to receive instructions on how to reset your password and regain access to your account. We're here to help you get back to bidding in no time!
          `;
  return (
    <div className="flex flex-col items-center justify-center w-[103%] h-full rounded-r-[20px] bg-brand-gradient shadow-[0_8px_20px_rgba(0,0,0,0.2)] text-white text-center gap-5 md:max-lg:rounded-[20px] md:max-lg:p-5 md:max-lg:w-full">
      <div className="text-[40px] font-bold leading-[45px] text-[#ffdde1]">
        {formType === "signin"
          ? "Welcome back!"
          : formType === "forgotPassword"
          ? "Reset Password"
          : "Create Account"}
      </div>
      <div className="text-base font-medium leading-[25px] text-center p-5">
        <p className="m-0">
          {formType === "signin"
            ? signInText
            : formType === "forgotPassword"
            ? forgotPasswordText
            : signUpText}
        </p>
      </div>
      <div className="w-[311px] h-[37px] p-4 gap-3 rounded-[62px] bg-link-bg flex justify-center items-center">
        {formType === "signin" ? (
          <>
            <p className="m-0 text-sm font-medium leading-[16.41px]">
              Don't have an account?
            </p>
            <Link
              to="/auth/signup"
              className="text-sm font-bold leading-[16.41px] tracking-[1.5px] underline text-white hover:underline hover:text-white transition-colors duration-300"
            >
              Signup here
            </Link>
          </>
        ) : formType === "forgotPassword" ? (
          <>
            <p className="m-0 text-sm font-medium leading-[16.41px]">
              Remember your password?
            </p>
            <Link
              to="/auth/signin"
              className="text-sm font-bold leading-[16.41px] tracking-[1.5px] underline text-white hover:underline hover:text-white transition-colors duration-300"
            >
              Signin here
            </Link>
          </>
        ) : (
          <>
            <p className="m-0 text-sm font-medium leading-[16.41px]">
              Already have an account?
            </p>
            <Link
              to="/auth/signin"
              className="text-sm font-bold leading-[16.41px] tracking-[1.5px] underline text-white hover:underline hover:text-white transition-colors duration-300"
            >
              Signin here
            </Link>
          </>
        )}
      </div>
      {formType === "signin" && (
        <div className="w-[311px] h-[37px] p-4 gap-3 rounded-[62px] bg-link-bg flex justify-center items-center">
          <p className="m-0 text-sm font-medium leading-[16.41px]">
            Forgot Password?
          </p>
          <Link
            to="/auth/forgot-password"
            className="text-sm font-bold leading-[16.41px] tracking-[1.5px] underline text-white hover:underline hover:text-white transition-colors duration-300"
          >
            Forgot here
          </Link>
        </div>
      )}
    </div>
  );
}
