import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup, Label, Spinner } from "reactstrap";
import { signInSchema } from "../../utils/validationSchema";
import "./auth.scss";
import AuthDetails from "./AuthDetails";
import eye from "../../assets/icons/eye.svg";
import eyeHide from "../../assets/icons/eye_hide.svg";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "../../utils/routeConstant";

export default function Signin() {
  const [isPasswordView, setIsPasswordView] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const signupInitialValues = {
    email: "",
    password: "",
    remember_password: false,
  };

  const handleFromSubmit = async (values, { resetForm }) => {
    const payload = {
      email: values.email,
      password: values.password,
      remember_password: values.remember_password,
    };
    try {
      await dispatch(signinUser(payload)).unwrap();
      resetForm();
      navigate(routeConstants.HOME_PAGE);
    } catch (error) {}
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card row m-0">
        {/* Form Section */}
        <div className="col-12 col-md-12 col-lg-6 form-section">
          <Formik
            initialValues={signupInitialValues}
            validationSchema={signInSchema}
            onSubmit={handleFromSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="heading">
                  <h2>Signin</h2>
                </div>
                {/* Email */}
                <FormGroup>
                  <Label>
                    Email <span className="error">*</span>
                  </Label>
                  <Field
                    type="email"
                    name="email"
                    className={`form-control custom-input-box ${
                      touched.email && errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                {/* Password */}
                <FormGroup>
                  <Label>
                    Password <span className="error">*</span>
                  </Label>
                  <div className="password-input-container">
                    <Field
                      type={isPasswordView ? "text" : "password"}
                      name="password"
                      className={`form-control  custom-input-box ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Password"
                    />
                    <div
                      className="eye-icon"
                      onClick={() => setIsPasswordView(!isPasswordView)}
                    >
                      <img
                        src={isPasswordView ? eye : eyeHide}
                        alt="password hide"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </FormGroup>

                {/* Remember Password Checkbox */}
                <FormGroup check>
                  <Label check>
                    <Field
                      type="checkbox"
                      name="remember_password"
                      className="form-check-input custom-checkbox-input"
                    />
                    Remember Password
                  </Label>
                </FormGroup>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="btn btn-primary custom-button "
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Details Section */}
        <div className="col-12 col-md-12 col-lg-6  details-section">
          <AuthDetails formType="signin" />
        </div>
      </div>
    </div>
  );
}
