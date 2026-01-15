import React from "react";
import { Link } from "react-router-dom";

const Inplay = () => {
  // 1. Data Array
  const matches = [
    {
      id: "35094067",
      team1: "Adelaide Strikers",
      team2: "Brisbane Heat",
      time: "Today at 01:45 pm",
      league: "Twenty20 Big Bash",
      isLive: false,
    },
    {
      id: "35098246",
      team1: "Northern Brave",
      team2: "Wellington Firebirds",
      time: "Today at 08:55 am",
      league: "Super Smash T20",
      isLive: true, // This triggers the Live Badge
    },
    {
      id: "35098529",
      team1: "Sunrisers Eastern Cape",
      team2: "Paarl Royals",
      time: "Today at 04:30 pm",
      league: "SA20",
      isLive: false,
    },
    {
      id: "35098532",
      team1: "MI Cape Town",
      team2: "Pretoria Capitals",
      time: "Today at 09:00 pm",
      league: "SA20",
      isLive: false,
    },
  ];

  return (
    <div>
      <section className="section">
        <div className="grid">
          {/* 2. Loop through matches */}
          {matches.map((match) => (
            <Link key={match.id} className="ipl-card" to={`/event/${match.id}`}>
              {/* 3. Conditional rendering for LIVE badge */}
              {match.isLive && (
                <div className="live-badge">
                  <div className="pulse-circle"></div> LIVE
                </div>
              )}

              <div className="teams">
                <div className="team">
                  <div className="team-name">{match.team1}</div>
                </div>
                <div className="vs-text">VS</div>
                <div className="team">
                  <div className="team-name">{match.team2}</div>
                </div>
              </div>

              <div className="match-info">
                <div className="match-time">{match.time}</div>
                <div className="venue">{match.league}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Inplay;
