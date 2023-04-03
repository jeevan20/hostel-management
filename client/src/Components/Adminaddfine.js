import { React, useState } from "react";
import axios from "axios";

function Adminaddfine(props) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [rollno, setRollno] = useState("");
  const [fine, setFine] = useState("");
  const [roomno, setroomno] = useState("");
  const [duedate, setduedate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const registerUser = () => {
    axios
      .post(
        "http://localhost:3001/adminnodue",
        {
          name: userName,
          email: email,
          rollno: rollno,
          roomno: roomno,
          fineamount: fine,
          duedate: duedate,
        },
        { withCredentials: true }
      )
      .then((res) => {
        props.addfineTOList(res.data);
        setSuccess("Fine Added sucessfully");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="admin-stu-register">
      <div className="">
        <div className="admin-stu-con-1">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="name"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label htmlFor="rollno">Roll No:</label>
          <input
            type="text"
            name="rollno"
            placeholder="roll no"
            value={rollno}
            onChange={(e) => {
              setRollno(e.target.value);
            }}
            required
          />
        </div>
        <div className="admin-stu-con-2">
          <label htmlFor="regno">roomno:</label>
          <input
            type="text"
            name="roomno"
            placeholder="roomno"
            value={roomno}
            onChange={(e) => {
              setroomno(e.target.value);
            }}
            required
          />
          <label htmlFor="dept">Fine Amount:</label>
          <input
            type="text"
            name="dept"
            placeholder="fineamount"
            value={fine}
            onChange={(e) => {
              setFine(e.target.value);
            }}
            required
          />
          <label htmlFor="roomNo">Due date:</label>
          <input
            type="text"
            name="duedata"
            placeholder="Due date"
            value={duedate}
            onChange={(e) => {
              setduedate(e.target.value);
            }}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        onClick={() => {
          registerUser();
          setUserName("");
          setEmail("");
          setRollno("");
          setFine("");
          setroomno("");
          setduedate("");
        }}
      >
        Register
      </button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default Adminaddfine;
