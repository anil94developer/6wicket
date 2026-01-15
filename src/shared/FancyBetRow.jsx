import React from "react";

const FancyBetRow = ({ market, onBetClick }) => {
  return (
    <React.Fragment>
      <div className="row-8 bmcolor mfc" style={{ position: "relative" }}>
        {market.title}
        <br />
        <span
          style={{
            fontSize: "10px",
            position: "absolute",
            bottom: "8px",
          }}
        >
          Max:{market.max}
        </span>
      </div>

      {market.suspended ? (
        <div className="row-4 bmcolor center mfc" style={{ height: "45px" }}>
          <span style={{ lineHeight: "44px" }}>SUSPENDED</span>
        </div>
      ) : (
        <>
          <div
            className="row-2 mfc laycolor center"
            style={{ height: "45px" }}
            onClick={onBetClick}
          >
            <span style={{ lineHeight: "26px" }}>{market.noRate}</span>
            <br />
            <span style={{ fontSize: "13px", fontWeight: "bold" }}>
              {market.noScore}
            </span>
          </div>
          <div
            className="row-2 mfc backcolor center"
            style={{ height: "45px" }}
            onClick={onBetClick}
          >
            <span style={{ lineHeight: "26px" }}>{market.yesRate}</span>
            <br />
            <span style={{ fontSize: "13px", fontWeight: "bold" }}>
              {market.yesScore}
            </span>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default FancyBetRow;
