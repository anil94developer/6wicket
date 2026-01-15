import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [theme, setTheme] = useState("light");

  // 2. Use useEffect to update the HTML attribute whenever 'theme' changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // 3. The toggle function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="top-bar">
      <div className="logo">
        <Link to="/home">
          <img src="assets/toplogo-DPzRMtaT.png" alt="Logo" />
        </Link>
      </div>
      <div className="user-details">
        <strong>C204</strong>
        <br />
        Chips: 0&nbsp;&nbsp;|&nbsp;&nbsp; Expo: 0
      </div>
      <div className="logout-icon">
        <span className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </span>
        <Link to="/login">➜]</Link>
      </div>
    </div>
  );
};

export default Header;
