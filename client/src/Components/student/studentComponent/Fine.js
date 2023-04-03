import axios from "axios";
import React from "react";
import StudentSidebar from "./StudentSidebar";
import "./Styles/Fine.css";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import UserNavbar from "../UserNavbar";

const Fine = () => {
  //Getting student details
  let id = "";
  const [cookies] = useCookies([]);
  let decoded = jwt_decode(cookies.jwt);
  id = decoded.id;

  const [fine, setFine] = useState([]);

  useEffect(() => {
    const getdata = () => {
      axios
        .get(`http://localhost:3001/viewdue/${id}`, { withCredentials: true })
        .then((res) => {
          setFine(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getdata();
  }, [id]);

  return (
    <div className="stu-page-fine">
      <UserNavbar />
      <div className="stu-fine-container">
        <StudentSidebar />
        <div className="stu-fine-details">
          <h3>Fine Details</h3>
          <table>
            <thead>
              <tr id="header">
                <th>Name</th>
                <th>Roll no</th>
                <th>Room no</th>
                <th>Fineamount</th>
                <th>Duedate</th>
              </tr>
            </thead>
            <tbody>
              {fine.map((val, key) => {
                return (
                  <tr key={key}>
                    <td data-label="Name">{val.name}</td>
                    <td data-label="Roll No">{val.rollno}</td>
                    <td data-label="Room No">{val.roomno}</td>
                    <td data-label="Fineamount">{val.fineamount}</td>
                    <td data-label="Duedate">{val.duedate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Fine;
