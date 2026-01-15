import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BetSlip from "../../shared/BetSlip";
import ResultSheet from "../../shared/ResultSheet";

const DragonTiger = () => {
  const [showBets, setShowBets] = useState(false);
  const [showBetPanel, setShowBetPanel] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);

  const location = useLocation();

  const gameConfig = {
    "/live/dt20": {
      id: "4012",
      title: "DRAGON TIGER",
      roundId: "116260102105951",
    },
    "/live/dt202": {
      id: "4012", // Placeholder ID for DT202, assuming similar stream for now
      title: "DRAGON TIGER 2",
      roundId: "116260102110547",
    },
  };

  const currentConfig =
    gameConfig[location.pathname] || gameConfig["/live/dt20"];

  const winners = ["T", "T", "D", "T", "D", "T", "T", "D", "T", "T"];
  // Updated chips to match BetSlip's expected format (2D array, strings for 'K')
  const chips = [
    [100, 200, 500, "1K"],
    ["5K", "10K", "25K", "50K"],
  ];

  const handleBetClick = (type, rate) => {
    setSelectedBet({ type, rate });
    setShowBetPanel(true);
  };

  const handleBetSubmit = (amount) => {
    alert(`Bet Placed: ${selectedBet?.type} - ${amount}`);
    setShowBetPanel(false);
  };

  return (
    <section className="section">
      <div className="iframe-container" style={{ width: "100%" }}>
        <iframe
          src={`https://cv.rose247.co/player/?id=${currentConfig.id}`}
          scrolling="none"
          style={{
            border: "none",
            width: "100%",
            height: "210px",
            backgroundColor: "black",
          }}
          title={currentConfig.title}
        ></iframe>
        <div className="overlay" style={{ height: "210px" }}>
          <div style={{ display: "inline-flex" }}>
            <div className="pcard locked" style={{ zoom: 0.5 }}>
              <div className="css-lock">
                <div className="css-lock-shackle"></div>
                <div className="css-lock-body"></div>
              </div>
            </div>
            <div className="pcard locked" style={{ zoom: 0.5 }}>
              <div className="css-lock">
                <div className="css-lock-shackle"></div>
                <div className="css-lock-body"></div>
              </div>
            </div>
          </div>
          <div className="roundid">{currentConfig.roundId}</div>
          <div className="counter">7</div>
        </div>
      </div>

      <div className="gridpar ghf">
        <div className="row-4 lh">
          0.97 <span className="won">0</span>
        </div>
        <div className="row-4 lh">&nbsp;</div>
        <div className="row-4 lh">
          0.97 <span className="won">0</span>
        </div>
        <div
          className="row-4 lh"
          onClick={() => handleBetClick("Dragon", "0.97")}
        >
          <div className="backcolor lh">
            <span>Dragon</span>
          </div>
        </div>
        <div className="row-4 lh">&nbsp;</div>
        <div
          className="row-4 lh"
          onClick={() => handleBetClick("Tiger", "0.97")}
        >
          <div className="backcolor lh">
            <span>Tiger</span>
          </div>
        </div>
      </div>

      <div
        className="gridpar"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <div
          className="row-12"
          style={{ background: "rgb(94, 91, 91)", padding: "5px" }}
        >
          Last 10 Winners
        </div>
        {winners.map((w, i) => (
          <div key={i} className="wn" onClick={() => setShowResult(true)}>
            {" "}
            {w}{" "}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "50px" }}>&nbsp;&nbsp;</div>

      <button className="open-btn" onClick={() => setShowBets(true)}>
        Show Bets
      </button>

      {/* Bets List Bottom Sheet */}
      <div
        className={`backdrop ${showBets ? "show" : ""}`}
        onClick={() => setShowBets(false)}
      ></div>
      <div className={`bottom-sheet ${showBets ? "show" : ""}`}>
        <div className="sheet-header" onClick={() => setShowBets(false)}>
          ✖
        </div>
        <table className="bettable">
          <thead>
            <tr>
              <th>Card</th>
              <th>Mode</th>
              <th>Rate</th>
              <th>Amt</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      {/* Bet Placement Bottom Sheet */}
      <div
        className={`backdrop ${showBetPanel ? "show" : ""}`}
        onClick={() => setShowBetPanel(false)}
      ></div>
      <div className={`bottom-sheet ${showBetPanel ? "show" : ""}`}>
        <div className="sheet-header" onClick={() => setShowBetPanel(false)}>
          ✖
        </div>
        {selectedBet && (
          <BetSlip
            title={selectedBet.type.toUpperCase()}
            rate={selectedBet.rate}
            chips={chips}
            onCancel={() => setShowBetPanel(false)}
            onSubmit={handleBetSubmit}
          />
        )}
      </div>
      {/* Result Details Bottom Sheet */}
      <ResultSheet
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        title={`${currentConfig.title} - ${currentConfig.roundId}`}
      >
        <tbody>
          <tr>
            <td>
              {" "}
              <div className="pcard diamond" style={{ zoom: 1 }}>
                <div className="corner top">
                  Q<br />♦
                </div>
                <div className="center-suit">♦</div>
                <div className="corner bottom">
                  Q<br />♦
                </div>
              </div>
            </td>
            <td>
              {" "}
              <div className="pcard spade" style={{ zoom: 1 }}>
                <div className="corner top">
                  3<br />♠
                </div>
                <div className="center-suit">♠</div>
                <div className="corner bottom">
                  3<br />♠
                </div>
              </div>
            </td>
            <td style={{ textAlign: "left" }}>Winner - Dragon</td>
          </tr>
        </tbody>
      </ResultSheet>
    </section>
  );
};

export default DragonTiger;
