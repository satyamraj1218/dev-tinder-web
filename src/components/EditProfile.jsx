import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  if (!user) return <div>Loading...</div>;
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || "");
  const [imageUrl, setImageUrl] = useState(user?.imageUrl || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, imageUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!");
    }
  };

  return (
    <>
      <div className="flex justify-center py-10">
        <div className="card bg-base-300 w-96 shadow-sm mx-5">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                onChange={(e) => setLastName(e.target.value)}
              />
              <legend className="fieldset-legend">Image URL</legend>
              <input
                type="text"
                value={imageUrl}
                className="input"
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                value={age}
                className="input"
                onChange={(e) => setAge(e.target.value)}
              />
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                value={gender}
                className="input"
                onChange={(e) => setGender(e.target.value)}
              />
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                value={about}
                className="input"
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center py-5">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="mx-5">
          <UserCard
            user={{ firstName, lastName, age, imageUrl, gender, about }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
