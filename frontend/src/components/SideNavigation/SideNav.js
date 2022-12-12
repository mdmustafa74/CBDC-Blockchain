import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";

// DATA FILE
import { SidebarData } from "./SlidebarData";
import "./SideNav.css";

export default function SideNav() {
  return (
    <>
      <div className="sideNav">
        {SidebarData.map((item, index) => {
          return (
            <ul key={index}>
              <li className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
}
