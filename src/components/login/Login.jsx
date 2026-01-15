import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Toast from "../Toast";

const Login = () => {
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("error");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => {
        setToastMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const login = async () => {
    try {
      const data = new URLSearchParams();
      data.append("user_name", name);
      data.append("password", pass);
      data.append("grant_type", "password");

      const res = await axiosInstance.post("/user/userLogin", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic YXBwbGljYXRpb246c2VjcmV0",
        },
      });

      console.log(res);
      navigate("/");
    } catch (e) {
      setToastType("error");
      // Check for CORS errors
      if (e.message && (e.message.includes("CORS") || e.message.includes("Network Error") || e.code === "ERR_NETWORK")) {
        setToastMsg("CORS Error: Unable to connect to server. Please check server configuration.");
      } else if (e.response?.status === 401 || e.response?.status === 403) {
        setToastMsg("Invalid username or password.");
      } else if (e.response?.data?.message) {
        setToastMsg(e.response.data.message);
      } else {
        setToastMsg("Login failed. Please try again.");
      }
      console.error("Login error:", e);
    }
  };

  const demoLogin = async () => {
    try {
      const res = await axiosInstance.post("/user/autoDemoUserLogin", {});
      console.log(res);
      navigate("/");
    } catch (e) {
      setToastType("error");
      // Check for CORS errors
      if (e.message && (e.message.includes("CORS") || e.message.includes("Network Error") || e.code === "ERR_NETWORK")) {
        setToastMsg("CORS Error: Unable to connect to server. Please check server configuration.");
      } else if (e.response?.data?.message) {
        setToastMsg(e.response.data.message);
      } else {
        setToastMsg("Demo login failed. Please try again.");
      }
      console.error("Demo login error:", e);
    }
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
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-field">
          <span>🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={login}>
          Login
        </button>

        <button className="demo-btn" onClick={demoLogin}>
          Login with Demo ID
        </button>
      </div>

      <div className="note">This site is not for Indian territory</div>

      {/* 🔹 Toast component */}
      <Toast
        message={toastMsg}
        type={toastType}
        onClose={() => setToastMsg("")}
      />
    </div>
  );
};

export default Login;
