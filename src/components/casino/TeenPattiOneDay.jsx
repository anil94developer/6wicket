import React, { useState } from "react";
import BetSlip from "../../shared/BetSlip";
import ResultSheet from "../../shared/ResultSheet";

const TeenPattiOneDay = () => {
  const [showBets, setShowBets] = useState(false);
  const [showBetPanel, setShowBetPanel] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);

  const winners = ["B", "B", "B", "A", "A", "B", "B", "B", "t", "B"];
  // Chips configuration
  const chips = [
    [100, 200, 500, "1K"],
    ["5K", "10K", "25K", "50K"],
  ];

  const handleBetClick = (type, rate, mode) => {
    // Mode can be 'Back' (YES) or 'Lay' (NO) based on the column
    setSelectedBet({ type, rate, mode });
    setShowBetPanel(true);
  };

  const handleBetSubmit = (amount) => {
    alert(`Bet Placed: ${selectedBet?.mode} ${selectedBet?.type} - ${amount}`);
    setShowBetPanel(false);
  };

  return (
    <section className="section">
      <div className="iframe-container" style={{ width: "100%" }}>
        <iframe
          src="https://cv.rose247.co/player/?id=4017"
          scrolling="none"
          style={{
            border: "none",
            width: "100%",
            height: "210px",
            backgroundColor: "black",
          }}
          title="Teen Patti One Day Stream"
        ></iframe>
        <div className="overlay" style={{ height: "210px" }}>
          <div>
            <div style={{ display: "inline-flex", width: "100%" }}>
              <div className="pcard spade" style={{ zoom: 0.5 }}>
                <div className="corner top">
                  A<br />♠
                </div>
                <div className="center-suit">♠</div>
                <div className="corner bottom">
                  A<br />♠
                </div>
              </div>
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
            <div style={{ display: "inline-flex", width: "100%" }}>
              <div className="pcard club" style={{ zoom: 0.5 }}>
                <div className="corner top">
                  8<br />♣
                </div>
                <div className="center-suit">♣</div>
                <div className="corner bottom">
                  8<br />♣
                </div>
              </div>
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
          </div>
          <div className="roundid">101260102123423</div>
          <div className="counter">17</div>
        </div>
      </div>

      <div className="gridpar ghf">
        <div className="row-6 lh">&nbsp;</div>
        <div className="row-3 lh backcolor">YES</div>
        <div className="row-3 lh laycolor">NO</div>

        <div className="row-6 lh bmcolor">
          PLAYER A <span className="won">0</span>
        </div>
        <div
          className="row-3 lh backcolor"
          onClick={() => handleBetClick("Player A", "36", "YES")}
        >
          36
        </div>
        <div
          className="row-3 lh laycolor"
          onClick={() => handleBetClick("Player A", "39", "NO")}
        >
          39
        </div>

        <div className="row-6 lh bmcolor">
          PLAYER B <span className="won">0</span>
        </div>
        <div className="row-6 lh bmcolor">SUSPENDED</div>
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
            title={`[ ${selectedBet.mode} ] ${selectedBet.type || ""}`}
            rate={selectedBet.rate}
            chips={chips}
            onCancel={() => setShowBetPanel(false)}
            onSubmit={handleBetSubmit}
          />
        )}
      </div>
      {/* Result Details Bottom Sheet */}
      {/* Result Details Bottom Sheet */}
      <ResultSheet
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        title="teenpatti_oneday - 101260102121606"
      >
        <tbody>
          <tr>
            <td>
              {" "}
              <div className="pcard diamond" style={{ zoom: 1 }}>
                <div className="corner top">
                  J<br />♦
                </div>
                <div className="center-suit">♦</div>
                <div className="corner bottom">
                  J<br />♦
                </div>
              </div>
            </td>
            <td>
              {" "}
              <div className="pcard club" style={{ zoom: 1 }}>
                <div className="corner top">
                  A<br />♣
                </div>
                <div className="center-suit">♣</div>
                <div className="corner bottom">
                  A<br />♣
                </div>
              </div>
            </td>
            <td>
              {" "}
              <div className="pcard club" style={{ zoom: 1 }}>
                <div className="corner top">
                  J<br />♣
                </div>
                <div className="center-suit">♣</div>
                <div className="corner bottom">
                  J<br />♣
                </div>
              </div>
            </td>
            <td> PLAYER A Winner </td>
          </tr>
          <tr>
            <td>
              {" "}
              <div className="pcard spade" style={{ zoom: 1 }}>
                <div className="corner top">
                  K<br />♠
                </div>
                <div className="center-suit">♠</div>
                <div className="corner bottom">
                  K<br />♠
                </div>
              </div>
            </td>
            <td>
              {" "}
              <div className="pcard heart" style={{ zoom: 1 }}>
                <div className="corner top">
                  Q<br />♥
                </div>
                <div className="center-suit">♥</div>
                <div className="corner bottom">
                  Q<br />♥
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
            <td> PLAYER B </td>
          </tr>
        </tbody>
      </ResultSheet>
    </section>
  );
};

export default TeenPattiOneDay;
