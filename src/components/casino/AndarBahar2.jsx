import React, { useState } from "react";
import BetSlip from "../../shared/BetSlip";
import ResultSheet from "../../shared/ResultSheet";

const AndarBahar2 = () => {
  const [showBets, setShowBets] = useState(false);
  const [showBetPanel, setShowBetPanel] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);

  const winners = ["b", "b", "a", "a", "b", "b", "b", "a", "a", "b"];
  const chips = [
    [100, 200, 500, "1K"],
    ["5K", "10K", "25K", "50K"],
  ];

  // Placeholder images for suit icons (using SVG data URIs from user snippet or generic placeholders)
  // Since the user provided specific SVGs, I should try to preserve them or use emojis/text if cleaner.
  // The provided snippet has complex SVGs. For brevity in this component, I will use similar SVGs or just simple text/emoji if suitable,
  // but to match the "rich aesthetics" requirement, I'll try to keep the structure.

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
          src="https://cv.rose247.co/player/?id=4014"
          scrolling="none"
          style={{
            border: "none",
            width: "100%",
            height: "210px",
            backgroundColor: "black",
          }}
          title="Andar Bahar 2 Stream"
        ></iframe>
        <div className="overlay" style={{ height: "210px" }}>
          <div className="abparent">
            <div className="abfc" style={{ top: "-20px" }}>
              <div>Andar</div>
              <div className="pcard diamond" style={{ zoom: 0.5 }}>
                <div className="corner top">
                  4<br />♦
                </div>
                <div className="center-suit">♦</div>
                <div className="corner bottom">
                  4<br />♦
                </div>
              </div>
              <div>Bahar</div>
            </div>
            <div
              className="abandar"
              id="abandar"
              style={{ display: "-webkit-box" }}
            >
              <div className="pcard spade" style={{ zoom: 0.5 }}>
                <div className="corner top">
                  10
                  <br />♠
                </div>
                <div className="center-suit">♠</div>
                <div className="corner bottom">
                  10
                  <br />♠
                </div>
              </div>
            </div>
            <div
              className="abbahar"
              id="abbahar"
              style={{ display: "-webkit-box" }}
            >
              <div className="pcard spade" style={{ zoom: 0.5 }}>
                <div className="corner top">
                  3<br />♠
                </div>
                <div className="center-suit">♠</div>
                <div className="corner bottom">
                  3<br />♠
                </div>
              </div>
            </div>
          </div>
          <div className="roundid">124260102163134</div>
          <div className="counter">0</div>
        </div>
      </div>

      <div className="gridpar ghf">
        <div className="row-6 lh bmcolor">
          ANDAR <span className="won">0</span>
        </div>
        <div className="row-6 lh">
          <div className="bmcolor lh">
            {/* Placeholder for Card Icon 1 */}
            <span style={{ fontSize: "24px" }}>♠</span>
          </div>
        </div>
        <div className="row-6 lh bmcolor">
          BAHAR <span className="won">0</span>
        </div>
        <div className="row-6 lh ">
          <div className="bmcolor lh">
            {/* Placeholder for Card Icon 2 */}
            <span style={{ fontSize: "24px" }}>♦</span>
          </div>
        </div>

        {/* Andar Odds */}
        <div
          className="row-4 lh"
          style={{ cursor: "pointer" }}
          onClick={() => handleBetClick("Andar", "0.83")}
        >
          0.83 <span className="won">0</span>
        </div>
        <div className="row-4 lh">&nbsp;</div>
        {/* Bahar Odds */}
        <div
          className="row-4 lh"
          style={{ cursor: "pointer" }}
          onClick={() => handleBetClick("Bahar", "0.83")}
        >
          0.83 <span className="won">0</span>
        </div>

        {/* Side Bets Row 1 */}
        <div className="row-4">
          <div
            className="bmcolor lh"
            onClick={() => handleBetClick("Side Bet 1", "2.83")}
          >
            <span style={{ fontSize: "24px" }}>♣</span>
          </div>
        </div>
        <div className="row-4">&nbsp;</div>
        <div className="row-4">
          <div
            className="bmcolor lh"
            onClick={() => handleBetClick("Side Bet 2", "2.83")}
          >
            <span style={{ fontSize: "24px" }}>♥</span>
          </div>
        </div>

        {/* Side Bets Odds Row 1 */}
        <div
          className="row-3 lh"
          onClick={() => handleBetClick("Side Bet 1", "2.83")}
        >
          2.83 <span className="won">0</span>{" "}
        </div>
        <div
          className="row-3 lh"
          onClick={() => handleBetClick("Side Bet 2", "2.83")}
        >
          2.83 <span className="won">0</span>{" "}
        </div>
        <div
          className="row-3 lh"
          onClick={() => handleBetClick("Side Bet 3", "2.83")}
        >
          2.83 <span className="won">0</span>{" "}
        </div>
        <div
          className="row-3 lh"
          onClick={() => handleBetClick("Side Bet 4", "2.83")}
        >
          2.83 <span className="won">0</span>{" "}
        </div>

        {/* Side Bets Row 2 (Icons) */}
        <div
          className="row-3"
          onClick={() => handleBetClick("Side Bet 1", "2.83")}
        >
          <div className="bmcolor lh">
            <span style={{ fontSize: "24px" }}>♠</span>
          </div>
        </div>
        <div
          className="row-3"
          onClick={() => handleBetClick("Side Bet 2", "2.83")}
        >
          <div className="bmcolor lh">
            <span style={{ fontSize: "24px" }}>♥</span>
          </div>
        </div>
        <div
          className="row-3"
          onClick={() => handleBetClick("Side Bet 3", "2.83")}
        >
          <div className="bmcolor lh">
            <span style={{ fontSize: "24px" }}>♣</span>
          </div>
        </div>
        <div
          className="row-3"
          onClick={() => handleBetClick("Side Bet 4", "2.83")}
        >
          <div className="bmcolor lh">
            <span style={{ fontSize: "24px" }}>♦</span>
          </div>
        </div>

        <div className="row-12 lh">
          <span>11</span>
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
        title="andarbahar2 - 124260102173100"
      >
        <tbody>
          <tr>
            <td style={{ textAlign: "left" }}> Andar </td>
          </tr>
          <tr>
            <td>
              <div
                style={{
                  textAlign: "left",
                  overflow: "scroll",
                  width: "90vw",
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ display: "inline-block" }}>
                  <div className="pcard diamond" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      3<br />♦
                    </div>
                    <div className="center-suit">♦</div>
                    <div className="corner bottom">
                      3<br />♦
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard diamond" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      5<br />♦
                    </div>
                    <div className="center-suit">♦</div>
                    <div className="corner bottom">
                      5<br />♦
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard club" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      9<br />♣
                    </div>
                    <div className="center-suit">♣</div>
                    <div className="corner bottom">
                      9<br />♣
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard spade" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      7<br />♠
                    </div>
                    <div className="center-suit">♠</div>
                    <div className="corner bottom">
                      7<br />♠
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard spade" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      K<br />♠
                    </div>
                    <div className="center-suit">♠</div>
                    <div className="corner bottom">
                      K<br />♠
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard heart" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      J<br />♥
                    </div>
                    <div className="center-suit">♥</div>
                    <div className="corner bottom">
                      J<br />♥
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard diamond" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      J<br />♦
                    </div>
                    <div className="center-suit">♦</div>
                    <div className="corner bottom">
                      J<br />♦
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard spade" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      A<br />♠
                    </div>
                    <div className="center-suit">♠</div>
                    <div className="corner bottom">
                      A<br />♠
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard spade" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      Q<br />♠
                    </div>
                    <div className="center-suit">♠</div>
                    <div className="corner bottom">
                      Q<br />♠
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {" "}
              <div className="pcard diamond" style={{ zoom: 0.5 }}>
                <div className="corner top">
                  4<br />♦
                </div>
                <div className="center-suit">♦</div>
                <div className="corner bottom">
                  4<br />♦
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div
                style={{
                  textAlign: "left",
                  overflow: "scroll",
                  width: "90vw",
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ display: "inline-block" }}>
                  <div className="pcard club" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      8<br />♣
                    </div>
                    <div className="center-suit">♣</div>
                    <div className="corner bottom">
                      8<br />♣
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard heart" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      3<br />♥
                    </div>
                    <div className="center-suit">♥</div>
                    <div className="corner bottom">
                      3<br />♥
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard club" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      7<br />♣
                    </div>
                    <div className="center-suit">♣</div>
                    <div className="corner bottom">
                      7<br />♣
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard heart" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      A<br />♥
                    </div>
                    <div className="center-suit">♥</div>
                    <div className="corner bottom">
                      A<br />♥
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard diamond" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      K<br />♦
                    </div>
                    <div className="center-suit">♦</div>
                    <div className="corner bottom">
                      K<br />♦
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard heart" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      10
                      <br />♥
                    </div>
                    <div className="center-suit">♥</div>
                    <div className="corner bottom">
                      10
                      <br />♥
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard club" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      5<br />♣
                    </div>
                    <div className="center-suit">♣</div>
                    <div className="corner bottom">
                      5<br />♣
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard heart" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      8<br />♥
                    </div>
                    <div className="center-suit">♥</div>
                    <div className="corner bottom">
                      8<br />♥
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard diamond" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      7<br />♦
                    </div>
                    <div className="center-suit">♦</div>
                    <div className="corner bottom">
                      7<br />♦
                    </div>
                  </div>
                </div>
                <div style={{ display: "inline-block" }}>
                  <div className="pcard spade" style={{ zoom: 0.5 }}>
                    <div className="corner top">
                      4<br />♠
                    </div>
                    <div className="center-suit">♠</div>
                    <div className="corner bottom">
                      4<br />♠
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ textAlign: "left" }}>🏆 Bahar</td>
          </tr>
        </tbody>
      </ResultSheet>
    </section>
  );
};

export default AndarBahar2;
