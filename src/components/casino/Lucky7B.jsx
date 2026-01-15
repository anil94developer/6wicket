import React, { useState } from "react";
import BetSlip from "../../shared/BetSlip";
import ResultSheet from "../../shared/ResultSheet";

const Lucky7B = () => {
  const [showBets, setShowBets] = useState(false);
  const [showBetPanel, setShowBetPanel] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);

  const winners = ["H", "T", "H", "H", "H", "H", "H", "H", "L", "L"];
  const chips = [
    [100, 200, 500, "1K"],
    ["5K", "10K", "25K", "50K"],
  ];

  const cards = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
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
          src="https://cv.rose247.co/player/?id=4011"
          scrolling="none"
          style={{
            border: "none",
            width: "100%",
            height: "210px",
            backgroundColor: "black",
          }}
          title="Lucky 7B Stream"
        ></iframe>
        <div className="overlay" style={{ height: "210px" }}>
          <div className="pcard locked" style={{ zoom: 0.5 }}>
            <div className="css-lock">
              <div className="css-lock-shackle"></div>
              <div className="css-lock-body"></div>
            </div>
          </div>
          <div className="roundid">107260102141041</div>
          <div className="counter">16</div>
        </div>
      </div>

      <div className="gridpar ghf">
        {/* Row 1: Low / High */}
        <div className="row-4 lh">
          0.97 <span className="won">0</span>
        </div>
        <div className="row-4 lh">&nbsp;</div>
        <div className="row-4 lh">
          0.97 <span className="won">0</span>
        </div>
        <div
          className="row-4 lh"
          onClick={() => handleBetClick("Low Card", "0.97")}
        >
          <div className="backcolor lh">
            <span>Low Card</span>
          </div>
        </div>
        <div className="row-4 lh">&nbsp;</div>
        <div
          className="row-4 lh"
          onClick={() => handleBetClick("High Card", "0.97")}
        >
          <div className="backcolor lh">
            <span>High Card</span>
          </div>
        </div>

        {/* Row 2: Even / Odd */}
        <div className="row-4 lh">
          1.12 <span className="won">0</span>
        </div>
        <div className="row-4 lh">&nbsp;</div>
        <div className="row-4 lh">
          0.83 <span className="won">0</span>
        </div>
        <div
          className="row-4 lh"
          onClick={() => handleBetClick("Even", "1.12")}
        >
          <div className="backcolor lh">
            <span>Even</span>
          </div>
        </div>
        <div className="row-4 lh">&nbsp;</div>
        <div className="row-4 lh" onClick={() => handleBetClick("Odd", "0.83")}>
          <div className="backcolor lh">
            <span>Odd</span>
          </div>
        </div>

        {/* Row 3: Cards Header */}
        <div className="row-12 lh">
          <span>11</span>
        </div>

        {/* Row 4+: Card Grid */}
        {cards.map((card) => (
          <div
            className="row-2 center"
            key={card}
            onClick={() => handleBetClick(`Card ${card}`, "11")}
          >
            <div className="pcard all-suits">
              <div className="corner top">{card}</div>
              <div className="corner bottom">{card}</div>
              <div className="center-suits-grid">
                <span className="heart">♥</span>
                <span className="diamond">♦</span>
                <span className="club">♣</span>
                <span className="spade">♠</span>
              </div>
            </div>
            <div style={{ display: "inline-block" }}>
              <span className="won">0</span>
            </div>
          </div>
        ))}
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
      <ResultSheet
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        title="lucky7b - 107260102154738"
      >
        <tbody>
          <tr>
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
            <td style={{ textAlign: "left" }}>
              Winner - Low Card <br />
              Even/Odd - Odd Card <br />
              Card - 3 <br />
            </td>
          </tr>
        </tbody>
      </ResultSheet>
    </section>
  );
};

export default Lucky7B;
