import React from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FactCheckIcon from "@mui/icons-material/FactCheck";
export const SidebarData = [
  {
    title: "Student Details",
    icon: <ManageAccountsIcon />,
    link: "/admin/student-details",
  },
  {
    title: "Compliants",
    icon: <FactCheckIcon />,
    link: "/admin/compliants",
  },
  {
    title: "Fine",
    icon: <FactCheckIcon />,
    link: "/admin/fine",
  },
];
