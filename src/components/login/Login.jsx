import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, demoLogin, clearError, fetchProfile } from "../../store/authSlice";
import Toast from "../Toast";

const Login = () => {
  const [theme, setTheme] = useState("light");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
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

  // Note: Navigation is now handled in handleLogin and handleDemoLogin functions
  // This useEffect is kept for backward compatibility but navigation happens in handlers

  // Handle error messages
  useEffect(() => {
    if (error) {
      setToastType("error");
      // Check for CORS errors
      if (error.code === "ERR_NETWORK" || error.message?.includes("CORS") || error.message?.includes("Network Error")) {
        setToastMsg("CORS Error: Unable to connect to server. Please check server configuration.");
      } else if (error.status === 401 || error.status === 403) {
        setToastMsg("Invalid username or password.");
      } else if (error.message) {
        setToastMsg(error.message);
      } else {
        setToastMsg("Login failed. Please try again.");
      }
      // Clear error after showing toast
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [error, dispatch]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogin = async () => {
    if (!name || !pass) {
      setToastType("error");
      setToastMsg("Please enter both username and password.");
      return;
    }
    try {
      // Dispatch login
      const loginResult = await dispatch(loginUser({ username: name, password: pass })).unwrap();
      
      // If login successful, fetch profile and then navigate
      if (loginResult) {
        await dispatch(fetchProfile()).unwrap();
        navigate("/home");
      }
    } catch (error) {
      // Error handling is done in the useEffect for error state
      console.error("Login error:", error);
    }
  };

  const handleDemoLogin = async () => {
    try {
      // Step 1: Get demo credentials
      const demoResult = await dispatch(demoLogin()).unwrap();
      
      // Extract credentials from response
      const credentials = demoResult?.data || demoResult;
      const demoUsername = credentials?.user_name;
      const demoPassword = credentials?.password;
      
      if (!demoUsername || !demoPassword) {
        setToastType("error");
        setToastMsg("Failed to get demo credentials. Please try again.");
        return;
      }
      
      // Step 2: Use credentials to login via regular login API
      const loginResult = await dispatch(loginUser({ 
        username: demoUsername, 
        password: demoPassword 
      })).unwrap();
      
      // Step 3: If login successful, fetch profile and then navigate
      if (loginResult) {
        await dispatch(fetchProfile()).unwrap();
        navigate("/home");
      }
    } catch (error) {
      // Error handling
      setToastType("error");
      if (error.code === "ERR_NETWORK" || error.message?.includes("CORS") || error.message?.includes("Network Error")) {
        setToastMsg("CORS Error: Unable to connect to server. Please check server configuration.");
      } else if (error.status === 401 || error.status === 403) {
        setToastMsg("Demo login failed. Invalid credentials.");
      } else if (error.message) {
        setToastMsg(error.message);
      } else {
        setToastMsg("Demo login failed. Please try again.");
      }
      console.error("Demo login error:", error);
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

        <button className="login-btn" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <button className="demo-btn" onClick={handleDemoLogin} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login with Demo ID"}
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
