import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup, Label, Spinner } from "reactstrap";
import { signInSchema } from "../../utils/validationSchema";
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
    <div className="bg-bg-grey p-10 min-h-screen">
      <div className="rounded-[20px] bg-white row m-0">
        {/* Form Section */}
        <div className="col-12 col-md-12 col-lg-6 py-20 px-[60px] md:max-lg:p-5">
          <Formik
            initialValues={signupInitialValues}
            validationSchema={signInSchema}
            onSubmit={handleFromSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div>
                  <h2 className="text-[40px] font-bold leading-[45px] text-primary mb-[30px] md:max-lg:text-center lg:text-left">
                    Signin
                  </h2>
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
                  <div className="relative">
                    <Field
                      type={isPasswordView ? "text" : "password"}
                      name="password"
                      className={`form-control  custom-input-box ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Password"
                    />
                    <div
                      className="absolute cursor-pointer right-10 top-[25px]"
                      onClick={() => setIsPasswordView(!isPasswordView)}
                    >
                      <img
                        src={isPasswordView ? eye : eyeHide}
                        alt="password hide"
                        className="w-5 h-5"
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
        <div className="col-12 col-md-12 col-lg-6">
          <AuthDetails formType="signin" />
        </div>
      </div>
    </div>
  );
}
