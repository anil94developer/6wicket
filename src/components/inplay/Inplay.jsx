import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchInplayMatches } from "../../store/matchesSlice";

const Inplay = () => {
  const dispatch = useAppDispatch();
  const { matches, isLoading, error } = useAppSelector((state) => state.matches);

  useEffect(() => {
    // Fetch matches when component mounts
    dispatch(fetchInplayMatches());
  }, [dispatch]);

  // Format match date to readable time
  const formatMatchTime = (dateString) => {
    if (!dateString) return "Time TBD";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const isToday = date.toDateString() === now.toDateString();
      
      if (isToday) {
        return `Today at ${date.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        })}`;
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      }
    } catch (err) {
      return "Time TBD";
    }
  };

  // Extract team names from match_name (e.g., "Goa v Maharashtra")
  const extractTeams = (matchName) => {
    if (!matchName) return { team1: "Team 1", team2: "Team 2" };
    const parts = matchName.split(" v ");
    if (parts.length === 2) {
      return { team1: parts[0].trim(), team2: parts[1].trim() };
    }
    return { team1: matchName, team2: "TBD" };
  };

  if (isLoading) {
    return (
      <div>
        <section className="section">
          <div className="grid">
            <div style={{ padding: "2rem", textAlign: "center" }}>Loading matches...</div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <section className="section">
          <div className="grid">
            <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
              Error: {error.message || "Failed to load matches"}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Filter matches to show only Cricket (sport_id: "4")
  const cricketMatches = matches.filter((match) => match.sport_id === "4");

  if (!cricketMatches || cricketMatches.length === 0) {
    return (
      <div>
        <section className="section">
          <div className="grid">
            <div style={{ padding: "2rem", textAlign: "center" }}>No cricket matches available</div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="section">
        <div className="grid">
          {/* Loop through cricket matches from API */}
          {cricketMatches.map((match) => {
            const teams = extractTeams(match.match_name);
            // Check if match is live based on inplay status
            const isLive = match.inplay === true;
            
            return (
              <Link key={match._id || match.match_id} className="ipl-card" to={`/event/${match.match_id || match._id}`}>
                {/* Conditional rendering for LIVE badge */}
                {isLive && (
                  <div className="live-badge">
                    <div className="pulse-circle"></div> LIVE
                  </div>
                )}

                <div className="teams">
                  <div className="team">
                    <div className="team-name">{teams.team1}</div>
                  </div>
                  <div className="vs-text">VS</div>
                  <div className="team">
                    <div className="team-name">{teams.team2}</div>
                  </div>
                </div>

                <div className="match-info">
                  <div className="match-time">{formatMatchTime(match.match_date)}</div>
                  <div className="venue">{match.series_name || match.sport_name || "Match"}</div>
                  {/* {match.market_name && (
                    <div className="market-name" style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>
                      {match.market_name}
                    </div>
                  )} */}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Inplay;
