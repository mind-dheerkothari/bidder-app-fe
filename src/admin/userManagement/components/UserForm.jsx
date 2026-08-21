import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import CustomDropDown from "../../../sharedComponents/customDropDown/CustomDropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  SUCCESS_MESSAGE,
  USER_ROLE,
  USER_ROLE_LABEL,
} from "../../../utils/propertyResolver";
import CustomInput from "../../../sharedComponents/customInput/CustomInput";
import { GrPowerReset } from "react-icons/gr";
import { signupUser } from "../../../redux/slices/authSlice";
import { showToast } from "../../../sharedComponents/toast/showTaost";
import Loader from "../../../sharedComponents/loader/Loader";
import { useNavigate } from "react-router-dom";
import { routeConstants } from "../../../utils/routeConstant";
import { updateUserDetailById } from "../../../redux/slices/userSlice";
export default function UserForm({ data = {}, formType = null }) {
  const initialFormState = {
    role_id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [userDetail, setUserDetail] = useState(initialFormState);
  const [error, setError] = useState(initialFormState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginUserInfo } = useSelector((state) => state.user);
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (
      ["view", "edit"].includes(formType) &&
      data &&
      Object.keys(data).length > 0
    ) {
      setUserDetail({
        role_id: {
          label: USER_ROLE_LABEL[data?.role_id],
          value: data?.role_id,
        },
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        email: data?.email || "",
        password: "",
        confirm_password: "",
      });
    }
  }, [data, formType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({
      ...prev,
      [name]: value,
    }));

    //Clear the error for the field being type into
    setError((prev) => {
      const newErrors = { ...prev };
      if (newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!userDetail?.role_id) newErrors.role_id = "User role is required";
    if (!userDetail.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!userDetail?.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userDetail?.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!userDetail?.password.trim() && formType !== "edit") {
      newErrors.password = "Password is required";
    } else if (
      userDetail?.password.trim()?.length > 0 &&
      userDetail?.password.trim()?.length < 6
    ) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!userDetail?.confirm_password.trim() && formType !== "edit") {
      newErrors.confirm_password = "Confirm password is required";
    } else if (userDetail.password !== userDetail.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDropDownChange = (value) => {
    setUserDetail((prev) => ({
      ...prev,
      role_id: value,
    }));
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        const payload = {
          first_name: userDetail.first_name,
          last_name: userDetail.first_name || "",
          email: userDetail.email,
          password: userDetail.password,
          role_id: String(userDetail.role_id?.value),
        };
        await dispatch(signupUser(payload)).unwrap();
        showToast(SUCCESS_MESSAGE.USER_CREATED, "success");
        setUserDetail(initialFormState);
      } catch (error) {
        console.log("Error while api calling", error);
      }
    }
  };

  const handleReset = () => {
    setUserDetail(initialFormState);
    setError(initialFormState);
  };

  const updateUserDetails = async () => {
    if (validateFields()) {
      try {
        const payload = {
          first_name: userDetail.first_name,
          last_name: userDetail.first_name || "",
          email: userDetail.email,
           ...(userDetail?.password ? { password: userDetail.password } : {}),
          role_id: String(userDetail.role_id?.value),
          userId: data?.id,
        };
        await dispatch(updateUserDetailById(payload)).unwrap();
        showToast(SUCCESS_MESSAGE.USER_UPDATED, "success");
      } catch (error) {
        console.log("Error while api calling", error);
      }
    }
  };
  return (
    <div className="user-form-wrapper">
      {isLoading && <Loader />}
      <Row>
        <Col xs={12} sm={12} md={6} lg={4}>
          <CustomDropDown
            label="User Role"
            name="role_id"
            value={userDetail?.role_id}
            onChange={handleDropDownChange}
            placeholder="Choose a role"
            options={[
              ...(loginUserInfo?.role_id === USER_ROLE.SUPER_ADMIN
                ? [{ label: "Admin", value: USER_ROLE.ADMIN }]
                : []),
              {
                label: "User",
                value: USER_ROLE.USER,
              },
            ]}
            required
            error={error?.role_id}
            disabled={formType === "view"}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={4}>
          <CustomInput
            label="First Name"
            type="text"
            name="first_name"
            value={userDetail?.first_name}
            placeholder="Enter first name"
            required
            onChange={handleInputChange}
            error={error?.first_name}
            validationRegex="^[A-Za-z][A-Za-z ]*$"
            disabled={formType === "view"}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={4}>
          <CustomInput
            label="Last Name"
            type="text"
            name="last_name"
            value={userDetail?.last_name}
            placeholder="Enter last name"
            required={false}
            onChange={handleInputChange}
            error={error?.last_name}
            validationRegex="^[A-Za-z][A-Za-z ]*$"
            disabled={formType === "view"}
          />
        </Col>

        <Col xs={12} sm={12} md={6} lg={4}>
          <CustomInput
            label="Email"
            type="text"
            name="email"
            value={userDetail?.email}
            placeholder="Enter email"
            required
            onChange={handleInputChange}
            error={error?.email}
            disabled={formType === "view"}
          />
        </Col>

        <Col xs={12} sm={12} md={6} lg={4}>
          <CustomInput
            label="Password"
            type="password"
            name="password"
            value={userDetail?.password}
            placeholder="Enter password"
            required={formType !== "edit"}
            onChange={handleInputChange}
            error={error?.password}
            validationRegex="^.{0,8}$"
            disabled={formType === "view"}
          />
        </Col>
        <Col xs={12} sm={12} md={6} lg={4}>
          <CustomInput
            label="Confirm Password"
            type="password"
            name="confirm_password"
            value={userDetail?.confirm_password}
            placeholder="Enter confirm password"
            required={formType !== "edit"}
            onChange={handleInputChange}
            error={error?.confirm_password}
            validationRegex="^.{0,8}$"
            disabled={formType === "view"}
          />
        </Col>
      </Row>

      <Row className="mt-4 d-flex justify-content-between align-items-center gap-2">
        <Col xs={12} sm={6} md={4} lg={2}>
            <button
              className="custom-button w-100"
              onClick={() => navigate(routeConstants.ADMIN_USER_LIST)}
            >
              Go Back
            </button>
          </Col>
        {formType === "view" ? (
          null
        ) : (
          <>
            <Col xs={12} sm={6} md={4} lg={4}>
              <div className="d-flex gap-2">
                <button className="secondary-button w-100" onClick={handleReset}>
                Reset <GrPowerReset />
              </button>
               <button
                className="custom-button w-100"
                onClick={formType === "edit" ? updateUserDetails : handleSubmit}
              >
                {formType === "edit" ? "Update" : "Submit"}
              </button>
              </div>
            </Col>
           
          </>
        )}
      </Row>
    </div>
  );
}
