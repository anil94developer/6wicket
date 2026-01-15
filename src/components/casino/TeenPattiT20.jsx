import React, { useState } from "react";
import BetSlip from "../../shared/BetSlip";
import ResultSheet from "../../shared/ResultSheet";

const TeenPattiT20 = () => {
  const [showBets, setShowBets] = useState(false);
  const [showBetPanel, setShowBetPanel] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);

  const winners = ["A", "B", "B", "A", "B", "B", "A", "A", "B", "A"];
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
          src="https://cv.rose247.co/player/?id=4016"
          scrolling="none"
          style={{
            border: "none",
            width: "100%",
            height: "210px",
            backgroundColor: "black",
          }}
          title="Teen Patti T20 Stream"
        ></iframe>
        <div className="overlay" style={{ height: "210px" }}>
          <div>
            <div style={{ display: "inline-flex", width: "100%" }}>
              <div className="pcard club" style={{ zoom: 0.5 }}>
                <div className="corner top">
                  J<br />♣
                </div>
                <div className="center-suit">♣</div>
                <div className="corner bottom">
                  J<br />♣
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
              <div className="pcard heart" style={{ zoom: 0.5 }}>
                <div className="corner top">
                  5<br />♥
                </div>
                <div className="center-suit">♥</div>
                <div className="corner bottom">
                  5<br />♥
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
          <div className="roundid">102260102121545</div>
          <div className="counter">0</div>
        </div>
      </div>

      <div className="gridpar ghf">
        <div className="row-6 lh">&nbsp;</div>
        <div className="row-6 lh backcolor">YES</div>

        <div
          className="row-6 lh bmcolor"
          onClick={() => handleBetClick("Player A", "1.98")}
        >
          PLAYER A <span className="won">0</span>
        </div>
        <div className="row-6 lh">
          <div className="bmcolor lh">
            <img
              className="vam"
              src="data:image/svg+xml,%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Transformed%20by:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='64px'%20height='64px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='SVGRepo_bgCarrier'%20stroke-width='0'/%3e%3cg%20id='SVGRepo_tracerCarrier'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cg%20id='SVGRepo_iconCarrier'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.75%208.25C9.75%207.00736%2010.7574%206%2012%206C13.2426%206%2014.25%207.00736%2014.25%208.25V9.75H9.75V8.25ZM8.25%209.75V8.25C8.25%206.17893%209.92893%204.5%2012%204.5C14.0711%204.5%2015.75%206.17893%2015.75%208.25V9.75H17.25L18%2010.5V18.75L17.25%2019.5H6.75L6%2018.75V10.5L6.75%209.75H8.25ZM7.5%2018V11.25H16.5V18H7.5Z'%20fill='%23ffffff'/%3e%3c/g%3e%3c/svg%3e"
              alt="icon"
            />
          </div>
        </div>

        <div
          className="row-6 lh bmcolor"
          onClick={() => handleBetClick("Player B", "1.98")}
        >
          PLAYER B <span className="won">0</span>
        </div>
        <div className="row-6 lh ">
          <div className="bmcolor lh">
            <img
              className="vam"
              src="data:image/svg+xml,%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Transformed%20by:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='64px'%20height='64px'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='SVGRepo_bgCarrier'%20stroke-width='0'/%3e%3cg%20id='SVGRepo_tracerCarrier'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cg%20id='SVGRepo_iconCarrier'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M9.75%208.25C9.75%207.00736%2010.7574%206%2012%206C13.2426%206%2014.25%207.00736%2014.25%208.25V9.75H9.75V8.25ZM8.25%209.75V8.25C8.25%206.17893%209.92893%204.5%2012%204.5C14.0711%204.5%2015.75%206.17893%2015.75%208.25V9.75H17.25L18%2010.5V18.75L17.25%2019.5H6.75L6%2018.75V10.5L6.75%209.75H8.25ZM7.5%2018V11.25H16.5V18H7.5Z'%20fill='%23ffffff'/%3e%3c/g%3e%3c/svg%3e"
              alt="icon"
            />
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
        title="teenpatti_t20 - 102260102121545"
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

export default TeenPattiT20;
