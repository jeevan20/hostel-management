import UserNavbar from "../UserNavbar";
import axios from "axios";
import React, { useState } from "react";
import StudentSidebar from "./StudentSidebar";
import { useEffect } from "react";
import { Modal } from "./Modal";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import "./Styles/UserProfile.css";
const UserProfile = () => {
  const [cookies] = useCookies([]);
  let decoded = jwt_decode(cookies.jwt);
  let id = decoded.id;

  const [openModal, setOpenModal] = useState(false);

  const [userdetails, setuserdetails] = useState([]);
  useEffect(() => {
    function getDetails() {
      axios
        .get(`http://localhost:3001/profile/${id}`, { withCredentials: true })
        .then((res) => {
          setuserdetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getDetails();
  }, [id]);

  return (
    <div className="stu-page-profile">
      <UserNavbar />
      <div className="stu-page-container">
        <StudentSidebar />
        <div className="stu-profile-container">
          <div className="stu-profile-details">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="profile"
            ></img>

            <div className="stud-details">
              <div className="col1">
                <h3>Name: {userdetails.name}</h3>
                <h3>Roll No: {userdetails.rollno}</h3>
                <h3>Email: {userdetails.email}</h3>
              </div>
              <div className="col2">
                <h3>Reg No: {userdetails.regno}</h3>
                <h3>Department: {userdetails.department}</h3>
                <h3>Room No: {userdetails.roomno}</h3>
              </div>
            </div>
            <button
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Change Password
            </button>
          </div>

          {openModal && (
            <Modal
              onClose={() => {
                setOpenModal(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
