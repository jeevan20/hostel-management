import React from "react";
import "./Styles/Sidebar.css";

const StudentSidebar = () => {
  const listofitems = [
    {
      title: "My profile",
      link: "/user",
      icon: <i className="icons fa-solid fa-user"></i>,
    },
    // {
    //   title: "Meal plan",
    //   link: "/Mealplan",
    //   icon: <i class="icons fa-solid fa-bowl-food"></i>,
    // },
    {
      title: "Complaint",
      link: "/Complaints",
      icon: <i className="icons fa-sharp fa-solid fa-clipboard-question"></i>,
    },
    {
      title: "Fine",
      link: "/Fine",
      icon: <i className="icons fa-solid fa-circle-exclamation"></i>,
    },
  ];
  return (
    <div className="stud-Sidebar">
      <ul className="stud-Sidebar-list">
        {listofitems.map((val, key) => {
          return (
            <li
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
              className="stud-row"
            >
              <div id="stud-icon">{val.icon}</div>
              <div id="stud-title">{val.title}</div>
            </li>
          );
        })}
        {/* <li>
          <AccountCircleIcon />
          <Link to="/user">Home</Link>
        </li>
        <li>
          <AccountCircleIcon />
          <Link to="/UserProfile">My profile</Link>
        </li>
        <li>
          <AccountCircleIcon />
          <Link to="/Mealplan">Mealplan</Link>
        </li>
        <li>
          <AccountCircleIcon />
          <Link to="/Complaints">Complaints</Link>
        </li>
        <li>
          <AccountCircleIcon />
          <Link to="/Fine">Fine</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default StudentSidebar;
