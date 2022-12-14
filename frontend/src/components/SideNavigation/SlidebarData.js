import React from "react";
import { MdAccountBalance, MdPayment, MdDashboard, MdOutlineMiscellaneousServices } from "react-icons/md";


export const SidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: <MdAccountBalance />,
    cName: "mt-1"
  },
  {
    title: "Account Details",
    path: "/accountDetails",
    icon: <MdDashboard />,
    cName: "mt-1"
  },
  {
    title: "Payment",
    path: "/payment",
    icon: <MdPayment />,
    cName: "mt-1"
  },
  {
    title: "Self Service",
    path: "/selfservice",
    icon: <MdOutlineMiscellaneousServices />,
    cName: "mt-1"
  },
];
