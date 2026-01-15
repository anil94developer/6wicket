import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
    <div className="login-container">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <div className="login-box">
        <div className="title">
          <img src="assets/logo-BZBOqOr3.png" alt="" />
        </div>
        <div className="input-field">
          <span>👤</span>
          <input type="text" placeholder="Username" id="name" name="name" />
        </div>
        <div className="input-field">
          <span>🔒</span>
          <input type="password" placeholder="Password" id="pass" name="pass" />
        </div>
        <button className="login-btn">Login</button>
        <Link to="/rules">
          <button className="demo-btn">Login with Demo ID</button>
        </Link>
      </div>
      <div className="note">This site is not for Indian territory</div>
    </div>
  );
};

export default Login;
