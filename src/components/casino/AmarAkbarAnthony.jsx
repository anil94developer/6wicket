import React, { useState } from "react";
import BetSlip from "../../shared/BetSlip";
import ResultSheet from "../../shared/ResultSheet";

const AmarAkbarAnthony = () => {
  const [showBets, setShowBets] = useState(false);
  const [showBetPanel, setShowBetPanel] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);

  // Sample winners data
  const winners = ["A", "B", "A", "A", "B", "B", "A", "A", "B", "A"];
  // Chips configuration
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
          src="https://cv.rose247.co/player/?id=4015"
          scrolling="none"
          style={{
            border: "none",
            width: "100%",
            height: "210px",
            backgroundColor: "black",
          }}
          title="Amar Akbar Anthony Stream"
        ></iframe>
        <div className="overlay" style={{ height: "210px" }}>
          <div className="pcard locked" style={{ zoom: 0.5 }}>
            <div className="css-lock">
              <div className="css-lock-shackle"></div>
              <div className="css-lock-body"></div>
            </div>
          </div>
          <div className="roundid">121260102180712</div>
          <div className="counter">28</div>
        </div>
      </div>

      <div className="gridpar ghf">
        {/* Row 1: Odds Display */}
        <div className="row-4 lh">
          <span className="won">0</span> - 1.12{" "}
        </div>
        <div className="row-4 lh">
          <span className="won">0</span> - 2.15
        </div>
        <div className="row-4 lh">
          <span className="won">0</span> - 3.15
        </div>

        {/* Row 2: Main Bets (Amar, Akbar, Anthony) */}
        <div className="row-4" onClick={() => handleBetClick("Amar", "1.12")}>
          <div className="backcolor lh">
            <span>Amar</span>
          </div>
        </div>
        <div className="row-4" onClick={() => handleBetClick("Akbar", "2.15")}>
          <div className="backcolor lh">
            <span>Akbar</span>
          </div>
        </div>
        <div
          className="row-4"
          onClick={() => handleBetClick("Anthony", "3.15")}
        >
          <div className="backcolor lh">
            <span>Anthony</span>
          </div>
        </div>

        {/* Row 3: Even/Odd Odds Display */}
        <div className="row-4 lh">
          <span className="won">0</span> - 1.12
        </div>
        <div className="row-4 lh">&nbsp;</div>
        <div className="row-4 lh">
          <span className="won">0</span> - 0.83
        </div>

        {/* Row 4: Even/Odd Bets */}
        <div className="row-4" onClick={() => handleBetClick("Even", "1.12")}>
          <div className="backcolor lh">
            <span>Even</span>
          </div>
        </div>
        <div className="row-4">&nbsp;</div>
        <div className="row-4" onClick={() => handleBetClick("Odd", "0.83")}>
          <div className="backcolor lh">
            <span>Odd</span>
          </div>
        </div>

        {/* Row 5: Red/Black Odds Display */}
        <div className="row-4 lh">
          <span className="won">0</span> - 0.97
        </div>
        <div className="row-4 lh">&nbsp;</div>
        <div className="row-4 lh">
          <span className="won">0</span> - 0.97
        </div>

        {/* Row 6: Red/Black Bets */}
        <div className="row-4" onClick={() => handleBetClick("Red", "0.97")}>
          <div className="backcolor lh">
            <span style={{ color: "red" }}>♥&nbsp;♦</span>
          </div>
        </div>
        <div className="row-4">&nbsp;</div>
        <div className="row-4" onClick={() => handleBetClick("Black", "0.97")}>
          <div className="backcolor lh">
            <span style={{ color: "black" }}>♠&nbsp;♣</span>
          </div>
        </div>
      </div>

      <div
        className="gridpar ghf"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <div
          className="row-12"
          style={{
            background: "rgb(94, 91, 91)",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
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
        title="amarakbaranthony - 121260102180712"
      >
        <tbody>
          <tr>
            <td colSpan="3">Result Data Not Available (Placeholder)</td>
          </tr>
        </tbody>
      </ResultSheet>
    </section>
  );
};

export default AmarAkbarAnthony;
