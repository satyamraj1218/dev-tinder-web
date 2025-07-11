import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connectionData = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.error(err?.response?.data || "something went wrong!!");
    }
  };

  useState(() => {
    getConnections();
  }, []);

  if (!connectionData) return;

  if (connectionData.length === 0) return <div>No Connections found!!</div>;

  return (
    <div>
      <h1 className="text-3xl text-center m-2">Connection</h1>

      {connectionData.map((item) => {
        const { firstName, lastName, age, gender, about, imageUrl } = item;
        return (
          <div className="flex bg-base-300 m-3 p-2 w-2/3 rounded-lg mx-auto">
            <div className="m-1">
              <img
                className="h-20 w-20 rounded-full"
                src={imageUrl}
                alt="photo"
              />
            </div>
            <div className="my-3 mx-2">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p> {about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
