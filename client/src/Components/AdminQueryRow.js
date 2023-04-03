import React from "react";
import { useState } from "react";
import axios from "axios";

function AdminQueryRow(props) {
  const [checkbt, setCheckbt] = useState(props.student.isDone);
  const sendMail = async (student) => {
    axios
      .post(
        `http://localhost:3001/mail/${student._id}`,

        { to: student.email },
        { withCredentials: true }
      )
      .then((res) => {
        setCheckbt(true);
        axios.post(
          "http://localhost:3001/query/isDone",
          { to: student.email, Complaint: student.Complaint },
          { withCredentials: true }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <tr>
      <td>{props.student.name}</td>
      <td>{props.student.rollno}</td>
      <td>{props.student.email}</td>
      <td>{props.student.roomno}</td>
      <td>{props.student.Complaint}</td>
      <td>
        <input
          type="checkbox"
          defaultChecked={checkbt}
          onChange={() => {
            sendMail(props.student);
          }}
        />
      </td>
    </tr>
  );
}

export default AdminQueryRow;
