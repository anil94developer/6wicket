import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout, fetchProfile } from "../store/authSlice";

const Header = () => {
  const [theme, setTheme] = useState("light");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, isProfileLoading } = useAppSelector((state) => state.auth);

  // Fetch profile when component mounts if authenticated
  useEffect(() => {
    if (isAuthenticated && !profile && !isProfileLoading) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, profile, isProfileLoading, dispatch]);

  // 2. Use useEffect to update the HTML attribute whenever 'theme' changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // 3. The toggle function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="top-bar">
      <div className="logo">
        <Link to="/home">
          <img src="assets/toplogo-DPzRMtaT.png" alt="Logo" />
        </Link>
      </div>
      <div className="user-details">
        <strong>
          {profile?.client_name || 
           profile?.name || 
           user?.name || 
           user?.user_name || 
           user?.username || 
           "User"}
        </strong>
        <br />
        Chips: {profile?.chips || profile?.balance || profile?.point || user?.chips || user?.balance || user?.point || 0}&nbsp;&nbsp;|&nbsp;&nbsp; Expo: {profile?.exposure_limit !== undefined ? (profile.exposure_limit === -1 ? 'Unlimited' : profile.exposure_limit) : (user?.exposure_limit !== undefined ? (user.exposure_limit === -1 ? 'Unlimited' : user.exposure_limit) : 0)}
      </div>
      <div className="logout-icon">
        <span className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </span>
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>➜]</span>
      </div>
    </div>
  );
};

export default Header;
