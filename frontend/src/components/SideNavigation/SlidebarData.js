import React from "react";
import { MdAccountBalance, MdPayment, MdDashboard, MdOutlineMiscellaneousServices } from "react-icons/md";


export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <MdAccountBalance />,
    cName: "nav-text"
  },
  {
    title: "Account Details",
    path: "/accountDetails",
    icon: <MdDashboard />,
    cName: "nav-text"
  },
  {
    title: "Payment",
    path: "/payment",
    icon: <MdPayment />,
    cName: "nav-text"
  },
  {
    title: "Self Service",
    path: "/selfservice",
    icon: <MdOutlineMiscellaneousServices />,
    cName: "nav-text"
  },
];
