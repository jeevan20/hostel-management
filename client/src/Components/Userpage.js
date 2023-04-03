import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function Userpage() {
  const [user, setUser] = useState({});
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    }
    const getUser = async () => {
      const user = await axios.get(
        "http://localhost:3001/profile/63d5f8adc7b33058959d70d2",
        { withCredentials: true }
      );

      setUser(user.data);
    };
    getUser();
  }, [navigate, cookies]);
  //
  return <div>{user.name}</div>;
}

export default Userpage;
