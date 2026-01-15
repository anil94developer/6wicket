import React from "react";

const ChangePassword = () => {
  return (
    <section className="section">
      <h2 className="cp">Change Password</h2>
      <form>
        <div className="input-groupcp">
          <label htmlFor="current-password" className="cplabel">
            Current Password
          </label>
          <input
            className="cpinput"
            type="password"
            id="current-password"
            required
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
            required
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
            required
          />
        </div>
        <button className="cpbutton">Update Password</button>
      </form>
    </section>
  );
};

export default ChangePassword;
