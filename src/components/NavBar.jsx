import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      dispatch(removeFeed());
      return navigate("/login");
    } catch (err) {
      //TODO: Handle error - create an error page
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <div className="flex row-auto">
          <Link to="/">
            <img
              className="w-16 h-16 mx-4"
              src="https://img.freepik.com/free-vector/creative-gradient-code-logo_23-2148820572.jpg?semt=ais_hybrid&w=740"
              alt="logo"
            ></img>
          </Link>
          <Link to="/" className="btn btn-ghost text-xl">
            devTinder
          </Link>
        </div>
      </div>
      {user && (
        <div className="flex gap-2">
          <p className="my-auto">Hey, {user?.firstName}</p>
          <div className="dropdown dropdown-end mx-6">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user && (
                <div className="w-10 rounded-full">
                  <img alt="Profile Pic" src={user.imageUrl} />
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connection">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
