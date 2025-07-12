import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {}
      );
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!!");
    }
  };
  return (
    <>
      <div className="flex justify-center py-10">
        <div className="card bg-base-300 w-2/3 shadow-sm">
          <div className="card-body m-auto">
            <h2 className="card-title justify-center">SignUp for devTinder</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                placeholder="Enter your email id"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                value={password}
                className="input"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500 flex justify-center">{error}</p>
            <div className="card-actions justify-center py-5">
              <button className="btn btn-primary" onClick={handleSignup}>
                SignUp
              </button>
            </div>
            <p className="mx-10">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>SignedUp successfully!! You can login now</span>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
