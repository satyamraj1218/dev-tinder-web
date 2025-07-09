import React from "react";

const UserCard = ({ user }) => {
  const { imageUrl, firstName, lastName, age, gender, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={imageUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p>
            {age}, {gender}
          </p>
        )}
        <p>{about}</p>
        <div className="card-actions justify-center my-3">
          <button className="btn btn-primary mx-3">Ignore</button>
          <button className="btn btn-secondary mx-3">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
