import React, { useEffect } from "react";
import UserForm from "./UserForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailById } from "../../../redux/slices/userSlice";
import { useParams } from "react-router-dom";
import Loader from "../../../sharedComponents/loader/Loader";

export default function UserView() {
  const dispatch = useDispatch();
  const params = useParams();
  const { userDetailById, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (params.id) {
      dispatch(getUserDetailById(params?.id));
    }
  }, [params?.id]);

  return (
    <div className="light-grey-bg h-100 p-3">
      {isLoading && <Loader />}
      <div className="table-card-wrapper">
        <UserForm data={userDetailById} formType="view" />
      </div>
    </div>
  );
}
