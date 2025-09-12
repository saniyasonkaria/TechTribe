import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const userData = useSelector((store) => store.user);
  return userData && <EditProfile details={userData} />;
};

export default Profile;
