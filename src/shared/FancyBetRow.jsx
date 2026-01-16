import React from "react";

const FancyBetRow = ({ market, onBetClick }) => {
  // Handle different API response structures
  const title = market.title || market.name || market.fancy_name || market.market_name || "Fancy Market";
  const max = market.max || market.max_stake || market.market_max_stack || 100000;
  const suspended = market.suspended || market.status === "SUSPENDED" || market.status === "CLOSED";
  
  // Extract NO and YES rates/scores from runners or direct properties
  let noRate = market.noRate;
  let noScore = market.noScore;
  let yesRate = market.yesRate;
  let yesScore = market.yesScore;

  // If market has runners array, extract NO and YES data
  if (market.runners && Array.isArray(market.runners)) {
    const noRunner = market.runners.find(r => 
      r.selection_name === "No" || 
      r.name === "No" || 
      r.selection_name?.toLowerCase().includes("no")
    );
    const yesRunner = market.runners.find(r => 
      r.selection_name === "Yes" || 
      r.name === "Yes" || 
      r.selection_name?.toLowerCase().includes("yes")
    );

    if (noRunner && noRunner.ex) {
      noRate = noRunner.ex.availableToBack?.[0]?.price || noRunner.ex.availableToLay?.[0]?.price || noRate;
      noScore = noRunner.ex.availableToBack?.[0]?.size || noRunner.ex.availableToLay?.[0]?.size || noScore;
    }

    if (yesRunner && yesRunner.ex) {
      yesRate = yesRunner.ex.availableToBack?.[0]?.price || yesRunner.ex.availableToLay?.[0]?.price || yesRate;
      yesScore = yesRunner.ex.availableToBack?.[0]?.size || yesRunner.ex.availableToLay?.[0]?.size || yesScore;
    }
  }

  return (
    <React.Fragment>
      <div className="row-8 bmcolor mfc" style={{ position: "relative" }}>
        {title}
        <br />
        <span
          style={{
            fontSize: "10px",
            position: "absolute",
            bottom: "8px",
          }}
        >
          Max: {max}
        </span>
      </div>

      {suspended ? (
        <div className="row-4 bmcolor center mfc" style={{ height: "45px" }}>
          <span style={{ lineHeight: "44px" }}>SUSPENDED</span>
        </div>
      ) : (
        <>
          <div
            className="row-2 mfc laycolor center"
            style={{ height: "45px", cursor: "pointer" }}
            onClick={onBetClick}
          >
            <span style={{ lineHeight: "26px" }}>{noRate || "--"}</span>
            <br />
            <span style={{ fontSize: "13px", fontWeight: "bold" }}>
              {noScore || "--"}
            </span>
          </div>
          <div
            className="row-2 mfc backcolor center"
            style={{ height: "45px", cursor: "pointer" }}
            onClick={onBetClick}
          >
            <span style={{ lineHeight: "26px" }}>{yesRate || "--"}</span>
            <br />
            <span style={{ fontSize: "13px", fontWeight: "bold" }}>
              {yesScore || "--"}
            </span>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default FancyBetRow;
