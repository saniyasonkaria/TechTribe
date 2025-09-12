import React from "react";

const UserCard = ({ details }) => {
  const { about, firstName, lastName, photoUrl, skills } = details;
  return (
    <div className="flex justify-center mt-2">
      <div className="card card-compact bg-base-100 w-80 shadow-xl ">
        <figure>
          <img src={photoUrl} alt="user" />
        </figure>
        <div className="card-body items-center text-center">
          <div className="card-title ">{firstName + " " + lastName}</div>
          <p>{about}</p>
          <div className="card-actions justify-between ">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interest</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
