import React from "react";
import UserNavbar from "../UserNavbar";
import StudentSidebar from "./StudentSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import "./Styles/Complaint.css";
const Complaints = () => {
  //Complaint process starts
  const [comp, setcomp] = useState("");
  const [complaints, setcomplaints] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //Acquiring student details
  const [cookies] = useCookies([]);
  let decoded = jwt_decode(cookies.jwt);
  let id = decoded.id;
  const [userdetails, setuserdetails] = useState([]);

  const getCompliantdata = () => {
    axios
      .get("http://localhost:3001/query", { withCredentials: true })
      .then((res) => {
        setcomplaints(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    getCompliantdata();
  }, [id]);

  //Submitting complaint
  const handlesubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:3001/query",
        {
          name: userdetails.name,
          email: userdetails.email,
          rollno: userdetails.rollno,
          roomno: userdetails.roomno,
          complaint: comp,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setSuccess(res.data.message);
        setError("");
        getCompliantdata();
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        setSuccess("");
        console.log(err);
      });
    setcomp("");
  };

  //Viewing query

  return (
    <div className="stu-page-complaints">
      <UserNavbar />
      <div className="stu-page-container">
        <StudentSidebar />
        <div className="stu-query-container">
          <div className="stu-query-post">
            <form action="" onSubmit={handlesubmit}>
              <div className="heading">
                <h4>REGISTER COMPLAINT</h4>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  value={comp}
                  onChange={(e) => {
                    setcomp(e.target.value);
                  }}
                  placeholder="Complaint..."
                  name="desc"
                ></input>
              </div>
              {error && <p className="error">{error}</p>}
              {success && <p className="success">{success}</p>}
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="stu-query-view">
            <div className="">COMPLAINT HISTORY</div>
            <table>
              <caption></caption>
              <thead>
                <tr>
                  <th scope="col">Complaints</th>
                  <th scope="col">Register Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td data-label="complaints">{val.Complaint}</td>
                      <td data-label="Register Date">
                        {new Date(val.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
