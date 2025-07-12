import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, imageUrl, firstName, lastName, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(requestId));
    } catch (err) {
      console.error(err?.response?.data || "Something went wrong!!");
    }
  };

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
          <button
            className="btn btn-primary mx-3"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary mx-3"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
