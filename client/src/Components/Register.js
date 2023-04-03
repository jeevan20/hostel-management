import { useState, React } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rollno, setRollno] = useState("");
  const [regno, setRegno] = useState("");
  const [department, setDepartment] = useState("");
  const [roomno, setRoomno] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const registerUser = () => {
    axios
      .post("http://localhost:3001/signup", {
        name: userName,
        password: password,
        email: email,
        rollno: rollno,
        regno: regno,
        department: department,
        roomno: roomno,
      })
      .then((res) => {
        setError("");
        navigate("/login");
      })
      .catch((err) => {
        // console.log(err);
        setError(err.response.data.message);
      });
  };
  return (
    <div className="register">
      <div className="input-container">
        <img
          src={process.env.PUBLIC_URL + "camu-login.png"}
          className="camu-bg"
          alt="camu-bg"
        />
        <div className="logo">Logo</div>
        <h2>Register</h2>
        <div className="bt-container">
          <div className="con-1">
            <label htmlFor="name">Name</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              placeholder="Password"
              value={conpassword}
              onChange={(e) => {
                setConPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="con-2">
            <label htmlFor="rollno">Roll No</label>
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
            <label htmlFor="regno">Reg No</label>
            <input
              type="text"
              name="regno"
              placeholder="Reg No"
              value={regno}
              onChange={(e) => {
                setRegno(e.target.value);
              }}
              required
            />
            <label htmlFor="dept">Department</label>
            <input
              type="text"
              name="dept"
              placeholder="Department"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              required
            />
            <label htmlFor="roomNo">Room No</label>
            <input
              type="text"
              name="roomNo"
              placeholder="Room No"
              value={roomno}
              onChange={(e) => {
                setRoomno(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <button
          onClick={() => {
            if (conpassword !== password) {
              setError("Passwords Does not Match");
            } else {
              registerUser();
              setUserName("");
              setPassword("");
              setConPassword("");
              setEmail("");
              setRollno("");
              setRegno("");
              setDepartment("");
              setRoomno("");
            }
          }}
        >
          Sign Up
        </button>
        {error && <p>{error}</p>}

        <span>
          Do you have account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
