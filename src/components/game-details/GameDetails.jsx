import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../../shared/Table";
import BetSlip from "../../shared/BetSlip";
import FancyBetRow from "../../shared/FancyBetRow";

const GameDetails = () => {
  const { id } = useParams();
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const toggleBottomSheet = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  const bookmakerData = [
    {
      team: "Adelaide Strikers",
      back: 0,
      lay: 1,
      profit: 0.0,
    },
    {
      team: "Brisbane Heat",
      back: 0,
      lay: 0,
      profit: 0.0,
    },
  ];

  const fancyData = [
    {
      title: "13 over run AS",
      max: 50000,
      noRate: 101,
      noScore: 110,
      yesRate: 101,
      yesScore: 90,
    },
    {
      title: "12 over run AS",
      max: 50000,
      suspended: true,
    },
  ];

  const columns = [
    { header: "Team", accessor: "team" },
    { header: "Mode", accessor: "mode" },
    { header: "Run", accessor: "run" },
    { header: "Rate", accessor: "rate" },
    { header: "Amt", accessor: "amt" },
    { header: "Status", accessor: "status" },
    { header: "Result", accessor: "result" },
  ];

  const betsData = [
    {
      team: "M Short Boundaries(AS vs BH)adv",
      mode: "No",
      run: 6,
      rate: 120,
      amt: 200,
      status: "WON",
      result: "2",
    },
  ];

  return (
    <div>
      <section className="section">
        {/* Iframe Section */}
        <div className="iframe-container">
          <iframe
            scrolling="no"
            allow="*;"
            src="https://cs.rose247.co/livescore.html?event_id=3869634608&amp;v=1.35101"
            title="Live Score"
          ></iframe>
          <div className="overlay">
            <div className="if-icon fl">⛶</div>
            <div
              className="if-icon"
              style={{ right: "45px", position: "inherit" }}
            >
              🖥️
            </div>
          </div>
        </div>

        {/* Bookmaker Market */}
        <div className="gridpar">
          <div className="row-12" style={{ marginTop: "0px" }}></div>
          <div className="row-8 mfc" style={{ height: "35px" }}>
            <div className="gridpar">
              <div className="row-6">
                Bookmaker
                <br />
                300000
              </div>
              <div
                className="row-6"
                style={{
                  textAlign: "center",
                  paddingTop: "7px",
                  background: "rgb(42, 176, 123)",
                }}
              >
                Cashout
              </div>
            </div>
          </div>
          <div
            className="row-2 mfc backcolor center"
            style={{ height: "35px" }}
          >
            <span style={{ lineHeight: "35px" }}>LAGAI</span>
          </div>
          <div className="row-2 mfc laycolor center" style={{ height: "35px" }}>
            <span style={{ lineHeight: "35px" }}>KHAI</span>
          </div>

          {/* Bookmaker Runners Loop */}
          {bookmakerData.map((runner, index) => (
            <React.Fragment key={index}>
              <div className="row-8 mfc bmcolor hg50">
                <span style={{ lineHeight: "30px" }}>{runner.team}</span>
                <br />
                <span className="won">{runner.profit.toFixed(2)}</span>
              </div>
              <div
                className="row-2 backcolor center hg50"
                onClick={() => runner.back !== 0 && toggleBottomSheet()}
              >
                <span className="mfc" style={{ lineHeight: "45px" }}>
                  {runner.back}
                </span>
              </div>
              <div
                className="row-2 laycolor center hg50"
                onClick={() => runner.lay !== 0 && toggleBottomSheet()}
              >
                <span className="mfc" style={{ lineHeight: "45px" }}>
                  {runner.lay}
                </span>
              </div>
            </React.Fragment>
          ))}

          {/* Fancy Market Header */}
          <div className="row-12" style={{ marginTop: "20px" }}></div>
          <div className="row-8 mfc" style={{ height: "35px" }}>
            <span style={{ lineHeight: "35px" }}>Fancy 100 - 100000</span>
          </div>
          <div className="row-2 mfc laycolor center" style={{ height: "35px" }}>
            <span style={{ lineHeight: "35px" }}>NO</span>
          </div>
          <div
            className="row-2 mfc backcolor center"
            style={{ height: "35px" }}
          >
            <span style={{ lineHeight: "35px" }}>YES</span>
          </div>

          {/* Fancy Markets Loop */}
          {fancyData.map((market, index) => (
            <FancyBetRow
              key={index}
              market={market}
              onBetClick={toggleBottomSheet}
            />
          ))}

          {/* Bottom Sheet */}
          <div
            className={`backdrop ${showBottomSheet ? "show" : ""}`}
            onClick={() => setShowBottomSheet(false)}
          ></div>
          <div className={`bottom-sheet ${showBottomSheet ? "show" : ""}`}>
            <div
              className="sheet-header"
              onClick={() => setShowBottomSheet(false)}
            >
              ✖
            </div>
            <BetSlip onCancel={() => setShowBottomSheet(false)} />
          </div>
        </div>

        {/* Existing Bets Table */}
        <div style={{ marginTop: "10px", marginBottom: "50px" }}>
          <div className="tcl">
            <Table columns={columns} data={betsData} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameDetails;
