import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

function UserNavbar() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  let decoded = jwt_decode(cookies.jwt);
  let id = decoded.id;
  const [userdetails, setuserdetails] = useState([]);

  useEffect(() => {
    function getDetails() {
      axios
        .get(`http://localhost:3001/profile/${id}`, { withCredentials: true })
        .then((res) => {
          if (res.data.message) {
            setuserdetails({ name: "Admin" });
          } else setuserdetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getDetails();
  }, [id]);
  const navigate = useNavigate();
  function Logout() {
    removeCookie("jwt");
    navigate("/login");
  }
  return (
    <div className="user-navbar">
      <div className="nav-logo">
        <h2>Logo</h2>
      </div>
      <div className="hello">
        Hello, {userdetails.name}
        <button className="user-navbar-logout" onClick={Logout}>
          logout
        </button>
      </div>
    </div>
  );
}

export default UserNavbar;
