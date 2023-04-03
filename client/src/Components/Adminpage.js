import { React, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useCookies } from "react-cookie";

import AdminAddstudent from "./AdminAddstudent";
import AdminUpdatestudent from "./AdminUpdatestudent";
import { useNavigate } from "react-router-dom";

import UserNavbar from "./UserNavbar";

function Adminpage() {
  const [studDetails, setStudDetails] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  const [addstudent, setAddstudent] = useState(false);
  const [updatestudent, setUpdatestudent] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({});

  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    } else {
    }
    getQueries();
  }, [navigate, cookies]);

  function getQueries() {
    axios
      .get("http://localhost:3001/adminpage", { withCredentials: true })
      .then((res) => {
        if (typeof res.data === "string") {
          setStudDetails([]);
        } else {
          setStudDetails(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const removeStudent = (id) => {
    axios
      .delete(`http://localhost:3001/studentcrud/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const newList = studDetails.filter((item) => {
          return item._id !== id;
        });
        setStudDetails(newList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addstudentTOList = (student) => {
    const newList = [...studDetails, student];
    setStudDetails(newList);
  };
  const updatestudentTOList = (student) => {
    studDetails.forEach((ele, ind) => {
      if (ele._id === student._id) {
        studDetails[ind] = student;
      }
    });

    setStudDetails(studDetails);
    setUpdateDetails(false);
  };

  return (
    <div className="Admin-stu-page">
      <UserNavbar />
      <div className="admin-stu-container">
        <Sidebar />
        <div className="admin-student-details">
          <div className="heading">
            <h4>Student Details</h4>
            <button
              onClick={() => {
                setAddstudent(!addstudent);
              }}
            >
              Add Student
            </button>
          </div>
          {updatestudent && (
            <AdminUpdatestudent
              updatestudentTOList={updatestudentTOList}
              student={updateDetails}
            />
          )}
          {addstudent && (
            <AdminAddstudent addstudentTOList={addstudentTOList} />
          )}
          <table>
            <caption></caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Roll No</th>
                <th scope="col">Reg No</th>
                <th scope="col">Department</th>
                <th scope="col">Email</th>
                <th scope="col">Room No</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {studDetails.map((val, key) => {
                return (
                  <tr key={key}>
                    <td data-label="Name">{val.name}</td>
                    <td data-label="Roll No">{val.rollno}</td>
                    <td data-label="Reg No">{val.regno}</td>
                    <td data-label="Department">{val.department}</td>
                    <td data-label="Email">{val.email}</td>
                    <td data-label="Room No">{val.roomno}</td>
                    <td data-label="Edit">
                      <button
                        onClick={() => {
                          setUpdatestudent(!updatestudent);
                          setUpdateDetails(val);
                        }}
                      >
                        ✎
                      </button>

                      <button
                        onClick={() => {
                          removeStudent(val._id);
                        }}
                        className="close"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Adminpage;
