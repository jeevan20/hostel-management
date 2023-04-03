import { React, useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import UserNavbar from "./UserNavbar";
import AdminQueryRow from "./AdminQueryRow";
function AdminQueryview() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    if (!cookies.jwt) {
      navigate("/login");
    } else {
    }
    getQueries();
  }, [navigate, cookies]);
  const [query, setQuery] = useState([]);
  const [querybt, setquerybt] = useState(false);

  function getQueries() {
    if (querybt) {
      setquerybt(!querybt);
      return;
    }
    axios
      .get("http://localhost:3001/adminqueryview", { withCredentials: true })
      .then((res) => {
        if (typeof res.data === "string") {
          setQuery([]);
        } else {
          setQuery(res.data);
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="Admin-stu-page">
      <UserNavbar />
      <div className="admin-stu-container">
        <Sidebar />
        <div className="admin-student-details">
          <div className="heading">
            <h4>Complaints</h4>
            <button onClick={getQueries}>Refresh queries</button>
          </div>

          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Email</th>
                <th>Room No</th>
                <th>Complaint</th>
                <th>Acknowledge</th>
              </tr>
              {query.map((val, key) => {
                return <AdminQueryRow student={val} key={key} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default AdminQueryview;
