import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup, Label, Spinner } from "reactstrap";
import "./auth.scss";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordSchema } from "../../utils/validationSchema";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/slices/authSlice";
import { routeConstants } from "../../utils/routeConstant";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { token } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      if (token) {
        const payload = {
          token,
          password: values?.password,
        };
        await dispatch(resetPassword(payload)).unwrap();
        resetForm();
        navigate(routeConstants.SIGN_IN);
      } else {
        navigate(routeConstants.SIGN_IN);
      }
    } catch (error) {
      console.log("Error while update password", error);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card row m-0">
        {/* Form Section */}
        <div className="form-section">
          <Formik
            initialValues={initialValues}
            validationSchema={updatePasswordSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="heading d-flex justify-content-center">
                  <h2>Update Password</h2>
                </div>

                {/* Row for 6 by 6 Grid */}
                <div className="row">
                  {/* Password */}
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>
                        Password <span className="error">*</span>
                      </Label>
                      <Field
                        type="password"
                        name="password"
                        className={`form-control custom-input-box ${
                          touched.password && errors.password
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter New Password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>
                        Confirm Password <span className="error">*</span>
                      </Label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className={`form-control custom-input-box ${
                          touched.confirmPassword && errors.confirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Confirm New Password"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </FormGroup>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    type="submit"
                    className="btn btn-primary custom-button"
                    disabled={isLoading}
                    style={{ maxWidth: "200px" }}
                  >
                    {isLoading ? <Spinner size="sm" /> : "Submit"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
