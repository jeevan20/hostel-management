import { React, useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Adminaddfine from "./Adminaddfine";
import UserNavbar from "./UserNavbar";
function AdminFineView() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const [studDetails, setStudDetails] = useState([]);
  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    } else {
      getQueries();
    }
  }, [navigate, cookies]);

  function getQueries() {
    axios
      .get("http://localhost:3001/adminnodue", { withCredentials: true })
      .then((res) => {
        setStudDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const addfineTOList = (fine) => {
    const newList = [...studDetails, fine];
    setStudDetails(newList);
  };

  const [addstudent, setAddstudent] = useState(false);
  return (
    <div className="Admin-stu-page">
      <UserNavbar />
      <div className="admin-stu-container">
        <Sidebar />
        <div className="admin-student-details">
          <div className="heading">
            <h4>Fine Details</h4>
            <button
              onClick={() => {
                setAddstudent(!addstudent);
              }}
              className="Add-fine-btn"
            >
              Add fine
            </button>
          </div>
          {addstudent && <Adminaddfine addfineTOList={addfineTOList} />}
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Roll No</th>

                <th>Email</th>
                <th>Room No</th>
                <th>Fine Amount</th>

                <th>Due Date</th>
              </tr>
              {studDetails.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.name}</td>
                    <td>{val.rollno}</td>

                    <td>{val.email}</td>
                    <td>{val.roomno}</td>
                    <td>{val.fineamount}</td>
                    <td>{val.duedate}</td>
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

export default AdminFineView;
