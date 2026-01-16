import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProfile } from "../../store/authSlice";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile, isProfileLoading } = useAppSelector((state) => state.auth);
  const [rateDiff, setRateDiff] = useState("5");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch profile when component mounts
    dispatch(fetchProfile())
      .unwrap()
      .catch((err) => {
        setError(err.message || "Failed to load profile");
      });
  }, [dispatch]);

  const handleUpdateRate = () => {
    // TODO: Implement rate update API call
    console.log("Update rate difference to:", rateDiff);
  };

  if (isProfileLoading) {
    return (
      <section className="section">
        <h2 className="cp">User Information</h2>
        <div className="back-main-menu" style={{ marginBottom: "1rem" }}>
          <Link to="/home">BACK TO MAIN MENU</Link>
        </div>
        <div>Loading profile...</div>
      </section>
    );
  }

  if (error && !profile) {
    return (
      <section className="section">
        <h2 className="cp">User Information</h2>
        <div className="back-main-menu" style={{ marginBottom: "1rem" }}>
          <Link to="/home">BACK TO MAIN MENU</Link>
        </div>
        <div style={{ color: "red", padding: "1rem" }}>Error: {error}</div>
      </section>
    );
  }

  // Extract profile data - response structure is { data: {...}, status: true }
  // profile is already set to action.payload.data in authSlice, so use it directly
  const profileData = profile;

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
                  value={rateDiff}
                  onChange={(e) => setRateDiff(e.target.value)}
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
                  onClick={handleUpdateRate}
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
              <td>{profileData?.client_code || profileData?.code || profileData?._id || profileData?.id || "N/A"}</td>
            </tr>
            <tr>
              <td>Client Name :</td>
              <td>{profileData?.client_name || profileData?.name || profileData?.user_name || profileData?.username || "N/A"}</td>
            </tr>
            <tr>
              <td>User Name :</td>
              <td>{profileData?.user_name || profileData?.name || profileData?.username || "N/A"}</td>
            </tr>
            <tr>
              <td>Date of Joining :</td>
              <td>{profileData?.date_of_joining || profileData?.created_at || profileData?.join_date || "N/A"}</td>
            </tr>
            <tr>
              <td>Address :</td>
              <td>{profileData?.address || profileData?.location || "N/A"}</td>
            </tr>
            {profileData?.mobile && (
              <tr>
                <td>Mobile :</td>
                <td>{profileData.country_code || ""}{profileData.mobile}</td>
              </tr>
            )}
            {profileData?.email && (
              <tr>
                <td>Email :</td>
                <td>{profileData.email}</td>
              </tr>
            )}
            {profileData?.phone && (
              <tr>
                <td>Phone :</td>
                <td>{profileData.phone}</td>
              </tr>
            )}
            {profileData?.point !== undefined && (
              <tr>
                <td>Point :</td>
                <td>{profileData.point}</td>
              </tr>
            )}
            {profileData?.balance !== undefined && (
              <tr>
                <td>Balance :</td>
                <td>{profileData.balance}</td>
              </tr>
            )}
            {profileData?.chips !== undefined && (
              <tr>
                <td>Chips :</td>
                <td>{profileData.chips}</td>
              </tr>
            )}
            {profileData?.exposure_limit !== undefined && (
              <tr>
                <td>Exposure Limit :</td>
                <td>{profileData.exposure_limit === -1 ? "Unlimited" : profileData.exposure_limit}</td>
              </tr>
            )}
            {profileData?.match_commission !== undefined && (
              <tr>
                <td>Match Commission :</td>
                <td>{profileData.match_commission}%</td>
              </tr>
            )}
            {profileData?.session_commission !== undefined && (
              <tr>
                <td>Session Commission :</td>
                <td>{profileData.session_commission}%</td>
              </tr>
            )}
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
              <td>{profileData?.help_line || profileData?.helpline || profileData?.support_phone || "+91-1234567890"}</td>
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
