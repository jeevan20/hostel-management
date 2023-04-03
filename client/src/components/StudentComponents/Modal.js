import React from "react";

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

export const Modal = ({ onClose }) => {
  const [cookies] = useCookies([]);
  let decoded = jwt_decode(cookies.jwt);
  let id = decoded.id;
  //   if (!open) return null;
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [conNewPass, setConNewPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const notify = () => toast("Wow so easy!");
  const submitHandler = (e) => {
    e.preventDefault();
    if (newPass.trim() === "" || conNewPass.trim() === "") {
      setError("Please Enter valid Password");
    } else {
      if (newPass === conNewPass) {
        axios
          .post(
            `http://localhost:3001/profile/password/${id}`,

            {
              oldPassword: oldPass,
              newPassword: newPass,
            },
            { withCredentials: true }
          )
          .then((res) => {
            setSuccess(res.data.message);
            setNewPass("");
            setOldPass("");
            setConNewPass("");
            setError("");
          })
          .catch((err) => {
            setError(err.response.data.message);
            setSuccess("");
            console.log(err);
          });
      } else {
        notify();
        <ToastContainer />;
        setError("password does not match");
      }
    }
  };
  return (
    <div className="stu-change-password">
      <div className="change-password-close">
        <button onClick={onClose} className="close-btn">
          X
        </button>
      </div>
      <form>
        <input
          type="password"
          className=""
          placeholder="Current Password"
          onChange={(e) => setOldPass(e.target.value)}
          value={oldPass}
        ></input>

        <input
          type="password"
          className=""
          placeholder="New Password"
          onChange={(e) => setNewPass(e.target.value)}
          value={newPass}
        ></input>

        <input
          type="password"
          className=""
          placeholder="Confirm New Password"
          onChange={(e) => setConNewPass(e.target.value)}
          value={conNewPass}
        ></input>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button onClick={submitHandler} className="">
          SUBMIT
        </button>
      </form>
    </div>
  );
};
