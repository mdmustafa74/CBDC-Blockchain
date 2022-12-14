import React from "react";
import "../../App.css";
import { NavLink } from "react-router-dom";

// DATA FILE
import { SidebarData } from "./SlidebarData";
import "./SideNav.css";

export default function SideNav(props) {
  return (
    <>
      <div className="sideNav">
        {SidebarData.map((item, index) => {
          return (
            <ul key={index}>
              <li
                className={item.cName}
                onClick={() => props.getData(item.title)}
              >
                <NavLink to={item.path} exact activeClassName="active">
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
}
