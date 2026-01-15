import React from "react";
import { Link } from "react-router-dom";

const matkaData = [
  {
    id: 9579,
    name: "FARIDABAD-01-01-2026",
    closesAt: "01 Jan 05:15 PM",
    isLive: true,
  },
  {
    id: 9580,
    name: "GHAZIABAD-01-01-2026",
    closesAt: "01 Jan 08:15 PM",
    isLive: true,
  },
  {
    id: 9577,
    name: "GALI-01-01-2026",
    closesAt: "01 Jan 10:30 PM",
    isLive: true,
  },
  {
    id: 9578,
    name: "DISAWAR-01-01-2026",
    closesAt: "02 Jan 03:00 AM",
    isLive: true,
  },
];

const Matka = () => {
  return (
    <section className="section matka-container">
      <div className="grid">
        {matkaData.map((item) => (
          <Link
            key={item.id}
            className="ipl-card"
            to={`/live/number/${item.id}`}
          >
            {item.isLive && (
              <div className="live-badge">
                <div className="pulse-circle"></div> LIVE
              </div>
            )}
            <div className="match-info">
              <div className="match-time">{item.name}</div>
              <div className="venue">Closes at : {item.closesAt}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Matka;
