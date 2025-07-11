import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requestsData = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err?.response?.data || "something went wrong!!");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err?.response?.data || "Something went wrong!!");
    }
  };

  useState(() => {
    fetchRequests();
  }, []);

  if (!requestsData) return;

  if (requestsData.length === 0)
    return (
      <div>
        <h1 className="flex justify-center text-2xl my-10">
          No Requests found!!
        </h1>
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl text-center m-2">Connection Requests</h1>

      {requestsData.map((item) => {
        const { _id, firstName, lastName, age, gender, about, imageUrl } =
          item?.fromUserId;
        return (
          <div
            key={_id}
            className="flex bg-base-300 m-3 p-2 w-2/3 rounded-lg mx-auto justify-between items-center"
          >
            <div className="m-1 mx-3">
              <img
                className="h-20 w-20 rounded-full"
                src={imageUrl}
                alt="photo"
              />
            </div>
            <div className="">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p> {about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", item._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", item._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
