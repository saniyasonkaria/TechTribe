import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ details }) => {
  const { about, gender, firstName, lastName, photoUrl, skills } = details;
  const [userDetails, setUserDetails] = useState({
    about,
    gender,
    firstName,
    lastName,
    photoUrl,
    skills,
  });
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSaveProfile = async () => {
    try {
      setError("");
      let res = await axios.patch(BASE_URL + "/profile/edit", userDetails, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setError(error.response.data);
    }
  };
  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
      <div className="flex justify-center my-7">
        <div className="card bg-base-300 w-96 shadow-xl ">
          <div className="card-body">
            <h2 className="card-title flex justify-center text-center mb-4">
              Edit Profile
            </h2>
            <label className="input input-bordered flex items-center gap-2">
              First Name :
              <input
                type="text"
                value={userDetails.firstName}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    ["firstName"]: e.target.value,
                  }))
                }
                className="grow"
                placeholder="Enter First Name"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Last Name :
              <input
                type="text"
                value={userDetails.lastName}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    ["lastName"]: e.target.value,
                  }))
                }
                className="grow"
                placeholder="Enter last Name"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Age :
              <input
                type="number"
                value={userDetails.age}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    ["age"]: e.target.value,
                  }))
                }
                className="grow"
                placeholder="Enter age"
              />
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  ["gender"]: e.target.value,
                }))
              }
            >
              <option>male</option>
              <option>female</option>
              <option>other</option>
            </select>
            <label className="input input-bordered flex items-center gap-2">
              photoUrl :
              <input
                type="text"
                value={userDetails.photoUrl}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    ["photoUrl"]: e.target.value,
                  }))
                }
                className="grow"
                placeholder="Enter photo Url"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              About :
              <input
                type="text"
                value={userDetails.about}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    ["about"]: e.target.value,
                  }))
                }
                className="grow"
                placeholder="Enter your about"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Skills :
              <input
                type="text"
                value={userDetails.skills}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    ["skills"]: e.target.value,
                  }))
                }
                className="grow"
                placeholder="Enter skills"
              />
            </label>
            <div className="text-red-600">{error}</div>
            <div className="card-actions justify-center  mt-2">
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
