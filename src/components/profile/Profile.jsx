import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <section className="section">
      <h2 className="cp">User Information</h2>
      <div className="back-main-menu" style={{ marginBottom: "1rem" }}>
        <Link to="/home">BACK TO MAIN MENU</Link>
      </div>
      <div>
        <table className="content-table">
          <tbody>
            <tr>
              <th colSpan="3" height="35" align="center" bgcolor="#d2e69c">
                <p
                  style={{
                    color: "rgb(51, 51, 51)",
                    fontFamily: "Verdana, Geneva, sans-serif",
                    fontSize: "13px",
                    fontWeight: "bold",
                    marginBottom: "0px",
                  }}
                >
                  RATE INFORMATION{" "}
                </p>
              </th>
            </tr>
            <tr>
              <td>Rate Difference :</td>
              <td>
                <select
                  id="ratediff"
                  name="ratediff"
                  className="profile-select"
                  defaultValue="5"
                >
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </td>
              <td>
                <button
                  className="submit-btn"
                  style={{
                    background: "rgb(0, 117, 128)",
                    color: "rgb(255, 255, 255)",
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table className="content-table">
          <tbody>
            <tr>
              <td
                colSpan="2"
                height="35"
                align="center"
                bgcolor="#d2e69c"
                className="TeamCombo"
              >
                <p
                  style={{
                    color: "rgb(51, 51, 51)",
                    fontFamily: "Verdana, Geneva, sans-serif",
                    fontSize: "13px",
                    fontWeight: "bold",
                    marginBottom: "0px",
                  }}
                >
                  PERSONAL INFORMATION{" "}
                </p>
              </td>
            </tr>
            <tr>
              <td>Client Code :</td>
              <td>C204</td>
            </tr>
            <tr>
              <td>Client Name :</td>
              <td>Demo User</td>
            </tr>
            <tr>
              <td>Date of Joining :</td>
              <td>07 Oct 02:24 PM</td>
            </tr>
            <tr>
              <td>Address :</td>
              <td>INDIA</td>
            </tr>
            <tr>
              <td
                colSpan="2"
                height="35"
                align="center"
                bgcolor="#d2e69c"
                className="TeamCombo"
              >
                <p
                  style={{
                    color: "rgb(51, 51, 51)",
                    fontFamily: "Verdana, Geneva, sans-serif",
                    fontSize: "13px",
                    fontWeight: "bold",
                    marginBottom: "0px",
                  }}
                >
                  COMPANY INFORMATION{" "}
                </p>
              </td>
            </tr>
            <tr>
              <td>HELP LINE NO :</td>
              <td>+91-1234567890</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="back-main-menu" style={{ marginBottom: "1rem" }}>
        <Link to="/home">BACK TO MAIN MENU</Link>
      </div>
    </section>
  );
};

export default Profile;
