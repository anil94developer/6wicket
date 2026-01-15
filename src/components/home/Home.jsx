import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // 1. Define your data array
  const menuItems = [
    {
      label: "Inplay",
      path: "/inplay",
      icon: "assets/inplay_new-Cv68V9Q_.png",
    },
    {
      label: "Matka",
      path: "/live/numbers",
      icon: "assets/matka_new-CYM3bRoj.png",
    },
    {
      label: "Casino",
      path: "/casino",
      icon: "assets/casino_new-DsNgt3Yj.png",
    },
    {
      label: "Statement",
      path: "/statement",
      icon: "assets/statements_new-BuQIWXLb.png",
    },
    { label: "My Ledger", path: "/ledger", icon: "assets/CL1-D-wOnmly.png" },
    {
      label: "Completed Games",
      path: "/completed-games",
      icon: "assets/CG1-DdEIZbvL.png",
    },
    {
      label: "Change Password",
      path: "/password",
      icon: "assets/CP1-D4LF8qL6.png",
    },
    {
      label: "My Profile",
      path: "/profile",
      icon: "assets/Profile-Dxc-tCuH.png",
    },
  ];

  return (
    <div>
      <div className="content">
        {/* 2. Loop through the array */}
        {menuItems.map((item, index) => (
          <Link key={index} className="card" to={item.path}>
            <img className="homelogo" src={item.icon} alt={item.label} />
            <br />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
