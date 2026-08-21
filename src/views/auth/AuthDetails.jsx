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
    <div className="auth-detail-wrapper">
      <div className="heading">
        {formType === "signin"
          ? "Welcome back!"
          : formType === "forgotPassword"
          ? "Reset Password"
          : "Create Account"}
      </div>
      <div className="content">
        <p>
          {formType === "signin"
            ? signInText
            : formType === "forgotPassword"
            ? forgotPasswordText
            : signUpText}
        </p>
      </div>
      <div className="link">
        {formType === "signin" ? (
          <>
            <p>Don't have an account?</p>
            <Link to="/auth/signup">Signup here</Link>
          </>
        ) : formType === "forgotPassword" ? (
          <>
            <p>Remember your password?</p>
            <Link to="/auth/signin">Signin here</Link>
          </>
        ) : (
          <>
            <p>Already have an account?</p>
            <Link to="/auth/signin">Signin here</Link>
          </>
        )}
      </div>
      {formType === "signin" && (
        <div className="link">
          <p>Forgot Password?</p>
          <Link to="/auth/forgot-password">Forgot here</Link>
        </div>
      )}
    </div>
  );
}
