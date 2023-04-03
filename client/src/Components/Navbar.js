import { React } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="span-logo">
        <Link to={"/"}>TCE</Link>
      </div>
      <ul className="nav-list">
        <li className="items">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="items">
          <Link to={"/contact"}>Contact</Link>
        </li>
        <li className="items">
          {" "}
          <Link to={"/login"}>Login</Link>
        </li>
        <li className="items item-signup">
          <Link to={"/register"}>Signup</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
// reference - https://dev.to/ziratsu/code-a-responsive-navbar-with-react-45le
