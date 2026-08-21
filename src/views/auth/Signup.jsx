import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup, Label, Spinner } from "reactstrap";
import { signUpSchema } from "../../utils/validationSchema";
import "./auth.scss";
import AuthDetails from "./AuthDetails";
import eye from "../../assets/icons/eye.svg";
import eyeHide from "../../assets/icons/eye_hide.svg";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "../../utils/routeConstant";
import { USER_ROLE } from "../../utils/propertyResolver";

export default function Signup() {
  const [isPasswordView, setIsPasswordView] = useState(false);
  const [isConfirmPasswordView, setIsConfirmPasswordView] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const signupInitialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const handleFromSubmit = async (values, { resetForm }) => {
    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      role_id: USER_ROLE.USER, // for normal user we pass this
    };
    try {
      // Dispatch signup api
      await dispatch(signupUser(payload)).unwrap();
      resetForm();
      navigate(routeConstants.SIGN_IN);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card row m-0">
        {/* Form Section */}
        <div className="col-12 col-md-12 col-lg-6 form-section">
          <Formik
            initialValues={signupInitialValues}
            validationSchema={signUpSchema}
            onSubmit={handleFromSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="heading">
                  <h2>Signup</h2>
                </div>
                {/* First Name */}
                <FormGroup>
                  <Label>
                    First Name <span className="error">*</span>
                  </Label>
                  <Field
                    type="text"
                    name="first_name"
                    className={`form-control custom-input-box ${
                      touched.first_name && errors.first_name
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Enter First Name"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                {/* Last Name */}
                <FormGroup>
                  <Label>Last Name</Label>
                  <Field
                    type="text"
                    name="last_name"
                    className={`form-control custom-input-box ${
                      touched.last_name && errors.last_name ? "is-invalid" : ""
                    }`}
                    placeholder="Enter Last Name"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
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
                {/* Confirm Password */}
                <FormGroup>
                  <Label>
                    Confirm Password <span className="error">*</span>
                  </Label>
                  <div className="password-input-container">
                    <Field
                      type={isConfirmPasswordView ? "text" : "password"}
                      name="confirm_password"
                      className={`form-control custom-input-box ${
                        touched.confirm_password && errors.confirm_password
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder="Confirm Password"
                    />
                    <div
                      className="eye-icon"
                      onClick={() =>
                        setIsConfirmPasswordView(!isConfirmPasswordView)
                      }
                    >
                      <img
                        src={isConfirmPasswordView ? eye : eyeHide}
                        alt="password hide"
                      />
                    </div>
                    <ErrorMessage
                      name="confirm_password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
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
          <AuthDetails formType="signup" />
        </div>
      </div>
    </div>
  );
}
