import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import axiosInstance from "../../api/axiosInstance";
import Toast from "../Toast";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("error");

  // Auto-hide toast after 3 seconds
  React.useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => {
        setToastMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setToastType("error");
      setToastMsg("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setToastType("error");
      setToastMsg("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setToastType("error");
      setToastMsg("New password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    setToastMsg("");

    try {
      const response = await axiosInstance.post("/user/selfChangePassword", {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      if (response.status || response.msg) {
        setToastType("success");
        setToastMsg(response.msg || "Password changed successfully!");
        // Clear form
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setToastType("error");
      // Check if logout is required
      if (error.response?.data?.logout === true) {
        dispatch(logout());
        navigate("/login");
        setToastMsg(error.response.data.msg || "Session expired. Please login again.");
        return;
      }
      if (error.response?.data?.msg) {
        setToastMsg(error.response.data.msg);
      } else if (error.response?.data?.message) {
        setToastMsg(error.response.data.message);
      } else if (error.message) {
        setToastMsg(error.message);
      } else {
        setToastMsg("Failed to change password. Please try again.");
      }
      console.error("Change password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <h2 className="cp">Change Password</h2>
      <div className="back-main-menu" style={{ marginBottom: "1rem" }}>
        <Link to="/home">BACK TO MAIN MENU</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-groupcp">
          <label htmlFor="current-password" className="cplabel">
            Current Password
          </label>
          <input
            className="cpinput"
            type="password"
            id="current-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="input-groupcp">
          <label htmlFor="new-password" className="cplabel">
            New Password
          </label>
          <input
            className="cpinput"
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="input-groupcp">
          <label htmlFor="confirm-password" className="cplabel">
            Confirm New Password
          </label>
          <input
            className="cpinput"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button 
          className="cpbutton" 
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>

      {/* Toast component */}
      <Toast
        message={toastMsg}
        type={toastType}
        onClose={() => setToastMsg("")}
      />
    </section>
  );
};

export default ChangePassword;
