import React from "react";

import { SidebarData } from "./SidebarData";
function Sidebar() {
  return (
    <div className="Sidebar">
      <ul className="Sidebar-list">
        <li className="logo">logo</li>
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
              className="row"
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
