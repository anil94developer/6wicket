import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMatchDetails, fetchFancyMarkets, fetchTeamPositions, saveBet } from "../../store/matchesSlice";
import Table from "../../shared/Table";
import BetSlip from "../../shared/BetSlip";
import FancyBetRow from "../../shared/FancyBetRow";
import Toast from "../Toast";

// Hook to detect mobile screen
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const GameDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { matchDetails, fancyMarkets, teamPositions, isDetailsLoading, isFancyLoading, isSavingBet, detailsError, fancyError, saveBetError } = useAppSelector((state) => state.matches);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("error");
  const isMobile = useIsMobile();

  useEffect(() => {
    if (id) {
      // Fetch match details when component mounts or id changes
      dispatch(fetchMatchDetails({ matchId: id, combine: true }));
      // Fetch fancy markets
      dispatch(fetchFancyMarkets({ matchId: id, combine: true }));
      // Fetch team positions
      dispatch(fetchTeamPositions({ matchId: id }));
    }
  }, [id, dispatch]);

  // Helper function to get user_pl for a runner
  const getUserPl = (marketId, selectionId) => {
    if (!teamPositions || !teamPositions[marketId]) {
      return null;
    }
    const position = teamPositions[marketId].find(
      (pos) => pos.selection_id === selectionId || pos.selectionId === selectionId
    );
    return position ? position.user_pl : null;
  };

  const toggleBottomSheet = (betData = null) => {
    if (betData) {
      setSelectedBet(betData);
    }
    setShowBottomSheet(!showBottomSheet);
  };

  const handleBetSubmit = async (amount) => {
    if (!selectedBet || !amount || amount <= 0) {
      setToastType("error");
      setToastMsg("Please enter a valid bet amount.");
      return;
    }

    const betPayload = {
      is_back: selectedBet.is_back,
      market_id: selectedBet.market_id,
      odds: selectedBet.odds,
      selection_id: selectedBet.selection_id,
      stack: parseFloat(amount),
    };

    try {
      const result = await dispatch(saveBet(betPayload));
      if (saveBet.fulfilled.match(result)) {
        // Success - close bottom sheet and reset selected bet
        setShowBottomSheet(false);
        setSelectedBet(null);
        setToastType("success");
        setToastMsg(result.payload?.msg || result.payload?.data?.msg || "Bet placed successfully!");
      } else {
        // Error handling
        if (result.payload?.logout) {
          // Logout handled by axios interceptor
          setToastType("error");
          setToastMsg("Session expired. Please login again.");
        } else {
          setToastType("error");
          setToastMsg(result.payload?.message || result.payload?.msg || "Failed to place bet");
        }
      }
    } catch (error) {
      setToastType("error");
      setToastMsg("An error occurred while placing the bet");
    }
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => {
        setToastMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  // matchDetails is now an array of markets
  const markets = Array.isArray(matchDetails) ? matchDetails : [];

  // Get match info from first market (all markets have same match info)
  const matchInfo = markets[0] || {};
  const matchName = matchInfo.match_name || "Match";

  // Get Match Odds market
  const matchOddsMarket = markets.find(m => m.market_type === "MATCH_ODDS");
  
  // Get Bookmaker markets (there can be multiple)
  const bookmakerMarkets = markets.filter(m => 
    m.market_type === "BOOKMAKER" && m.status !== "SUSPENDED"
  );
  
  // Get suspended Bookmaker market
  const suspendedBookmakerMarket = markets.find(m => 
    m.market_type === "BOOKMAKER" && m.status === "SUSPENDED"
  );

  // Get other markets (TO WIN THE TOSS, etc.)
  const otherMarkets = markets.filter(m => 
    m.market_type !== "MATCH_ODDS" && 
    m.market_type !== "BOOKMAKER" &&
    m.status === "OPEN"
  );

  // Helper function to format price
  const formatPrice = (price) => {
    if (price === 0 || price === "--" || price === null || price === undefined) {
      return "--";
    }
    return typeof price === "number" ? price.toFixed(2) : price;
  };

  // Helper function to format size
  const formatSize = (size) => {
    if (size === 0 || size === "--" || size === null || size === undefined) {
      return "";
    }
    if (typeof size === "string") {
      return size;
    }
    if (typeof size === "number") {
      if (size >= 1000) {
        const kValue = size / 1000;
        // If it's a whole number, show without decimals
        if (kValue % 1 === 0) {
          return kValue.toFixed(0) + "K";
        }
        // Otherwise show 1 decimal place
        return kValue.toFixed(1) + "K";
      }
      // For numbers less than 1000, show with 2 decimal places if needed
      return size % 1 === 0 ? size.toString() : size.toFixed(2);
    }
    return size.toString();
  };

  // Render market section
  const renderMarketSection = (market, title, showCashout = false) => {
    if (!market || !market.runners) return null;

    const isSuspended = market.status === "SUSPENDED";
    const cashoutValue = market.matched || 0;

    return (
      <React.Fragment key={market.market_id}>
        <div className="row-12" style={{ marginTop: "20px" }}></div>
        <div className="row-8 mfc" style={{ height: "35px" }}>
          <div className="gridpar">
            <div className="row-6">
              {title}
              {showCashout && (
                <>
                  <br />
                  {cashoutValue}
                </>
              )}
            </div>
            {showCashout && (
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
            )}
          </div>
        </div>
        <div className="row-2 mfc backcolor center" style={{ height: "35px" }}>
          <span style={{ lineHeight: "35px" }}>LAGAI</span>
        </div>
        <div className="row-2 mfc laycolor center" style={{ height: "35px" }}>
          <span style={{ lineHeight: "35px" }}>KHAI</span>
        </div>

        {market.runners.map((runner, index) => {
          const backPrices = runner.ex?.availableToBack || [];
          const layPrices = runner.ex?.availableToLay || [];
          
          // Get prices based on screen size: mobile shows only first (index 0), desktop shows 3
          const priceCount = isMobile ? 1 : 3;
          const topBack = backPrices.slice(0, priceCount);
          const topLay = layPrices.slice(0, priceCount);

          // Get user_pl from team positions
          const selectionId = runner.selectionId || runner.selection_id;
          const userPl = getUserPl(market.market_id, selectionId);
          const displayPl = userPl !== null ? userPl : (runner.win_loss !== undefined ? runner.win_loss : null);

          return (
            <React.Fragment key={runner.selectionId || index}>
              {/* Team Name Row */}
              <div 
                className="row-8 mfc bmcolor" 
                style={{ 
                  height: "60px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "8px 12px",
                  borderRight: "1px solid rgba(0,0,0,0.1)"
                }}
              >
                <span style={{ lineHeight: "22px", fontWeight: "bold", fontSize: "0.95rem" }}>
                  {runner.selection_name || runner.name}
                </span>
                {displayPl !== null && displayPl !== 0 && (
                  <span 
                    style={{ 
                      fontSize: "0.8rem", 
                      marginTop: "3px",
                      color: displayPl >= 0 ? "#4caf50" : "#f44336",
                      fontWeight: "bold"
                    }}
                  >
                    {displayPl.toFixed(0)}
                  </span>
                )}
              </div>
              
              {/* BACK (LAGAI) Column - Prices in Row with Responsive Cards */}
              <div
                className={`row-2 ${isSuspended ? "mfc" : ""}`}
                style={{
                  minHeight: "60px",
                  background: isSuspended ? "#ccc" : undefined,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                  padding: "8px 4px",
                  gap: "6px",
                  flexWrap: "wrap",
                  width: "100%",
                  boxSizing: "border-box"
                }}
              >
                {isSuspended ? (
                  <span className="mfc" style={{ width: "100%", textAlign: "center", padding: "10px 0" }}>SUSPENDED</span>
                ) : (
                  <>
                    {topBack.length > 0 ? (
                      topBack.map((price, idx) => (
                        
                        <div 
                          key={idx}
                          className="price-card"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px 4px",
                            background: "#4083f8",
                            transition: "all 0.2s ease",
                            // cursor: isSuspended ? "default" : "pointer",
                            textAlign: "center"
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isSuspended) {
                              toggleBottomSheet({
                                is_back: 1,
                                market_id: market.market_id,
                                odds: parseFloat(price.price),
                                selection_id: selectionId,
                                runner_name: runner.selection_name || runner.name,
                              });
                            }
                          }}
                          // onMouseEnter={(e) => {
                          //   if (!isSuspended) {
                          //     e.currentTarget.style.transform = "scale(1.05)";
                          //     const currentOpacity = idx === 0 ? 0.1 : idx === 1 ? 0.2 : 0.4;
                          //     e.currentTarget.style.background = `rgba(255, 255, 255, ${Math.min(currentOpacity + 0.1, 1)})`;
                          //   }
                          // }}
                          // onMouseLeave={(e) => {
                          //   e.currentTarget.style.transform = "scale(1)";
                          //   const originalOpacity = idx === 0 ? 0.1 : idx === 1 ? 0.2 : 0.4;
                          //   e.currentTarget.style.background = `rgba(255, 255, 255, ${originalOpacity})`;
                          // }}
                        >
                          <div style={{ 
                            fontWeight: "bold", 
                            fontSize: "0.95rem",
                            color: "#fff",
                            lineHeight: "1.2"
                          }}>
                            {formatPrice(price.price)}
                          </div>
                          {price.size && (
                            <div style={{ 
                              fontSize: "0.7rem", 
                              opacity: 0.9, 
                              marginTop: "3px",
                              color: "#fff"
                            }}>
                              {formatSize(price.size)}
                            </div>
                          )}
                        </div>
                         
                      ))
                    ) : (
                      <span className="mfc" style={{ width: "100%", textAlign: "center", padding: "10px 0" }}>--</span>
                    )}
                  </>
                )}
              </div>
              
              {/* LAY (KHAI) Column - Prices in Row with Responsive Cards */}
              <div
                className={`row-2 ${isSuspended ? "mfc" : ""}`}
                style={{
                  minHeight: "60px",
                  background: isSuspended ? "#ccc" : undefined,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                  padding: "8px 4px",
                  gap: "6px",
                  flexWrap: "wrap",
                  width: "100%",
                  boxSizing: "border-box"
                }}
              >
                {isSuspended ? (
                  <span className="mfc" style={{ width: "100%", textAlign: "center", padding: "10px 0" }}>SUSPENDED</span>
                ) : (
                  <>
                    {topLay.length > 0 ? (
                      topLay.map((price, idx) => (
                        <div 
                          key={idx}
                          className="price-card"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px 4px",
                            background: "#d468a2",
                            transition: "all 0.2s ease",
                            cursor: isSuspended ? "default" : "pointer",
                            textAlign: "center"
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isSuspended) {
                              toggleBottomSheet({
                                is_back: 0,
                                market_id: market.market_id,
                                odds: parseFloat(price.price),
                                selection_id: selectionId,
                                runner_name: runner.selection_name || runner.name,
                              });
                            }
                          }}
                          // onMouseEnter={(e) => {
                          //   if (!isSuspended) {
                          //     e.currentTarget.style.transform = "scale(1.05)";
                          //     const currentOpacity = idx === 0 ? 0.1 : idx === 1 ? 0.4 : 0.9;
                          //     e.currentTarget.style.background = `rgba(255, 255, 255, ${Math.min(currentOpacity + 0.1, 1)})`;
                          //   }
                          // }}
                          // onMouseLeave={(e) => {
                          //   e.currentTarget.style.transform = "scale(1)";
                          //   const originalOpacity = idx === 0 ? 0.1 : idx === 1 ? 0.4 : 0.9;
                          //   e.currentTarget.style.background = `rgba(255, 255, 255, ${originalOpacity})`;
                          // }}
                        >
                          <div style={{ 
                            fontWeight: "bold", 
                            fontSize: "0.95rem",
                            color: "#fff",
                            lineHeight: "1.2"
                          }}>
                            {formatPrice(price.price)}
                          </div>
                          {price.size && (
                            <div style={{ 
                              fontSize: "0.7rem", 
                              opacity: 0.9, 
                              marginTop: "3px",
                              color: "#fff"
                            }}>
                              {formatSize(price.size)}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <span className="mfc" style={{ width: "100%", textAlign: "center", padding: "10px 0" }}>--</span>
                    )}
                  </>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

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

  if (isDetailsLoading) {
    return (
      <div>
        <section className="section">
          <div style={{ padding: "2rem", textAlign: "center" }}>Loading match details...</div>
        </section>
      </div>
    );
  }

  if (detailsError) {
    return (
      <div>
        <section className="section">
          <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
            Error: {detailsError.message || "Failed to load match details"}
          </div>
        </section>
      </div>
    );
  }

  // Get match scoreboard URL if available
  const scoreboardUrl = matchInfo.match_scoreboard_url || 
                       matchInfo.match_tv_url || 
                       `https://cs.rose247.co/livescore.html?event_id=${id}&amp;v=1.35101`;

  return (
    <div>
      <section className="section">
        {/* Match Header */}
        {matchName && (
          <div style={{ padding: "10px", textAlign: "center", fontWeight: "bold", fontSize: "1.1rem" }}>
            {matchName}
          </div>
        )}

        {/* Iframe Section */}
        <div className="iframe-container">
          <iframe
            scrolling="no"
            allow="*;"
            src={scoreboardUrl}
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

        {/* Markets Section */}
        <div className="gridpar">
          {/* Match Odds Market */}
          {matchOddsMarket && renderMarketSection(
            matchOddsMarket, 
            matchOddsMarket.market_name || "Match Odds",
            true
          )}

          {/* Bookmaker Markets */}
          {bookmakerMarkets.map((market, idx) => 
            renderMarketSection(
              market,
              market.market_name || "Bookmaker",
              true
            )
          )}

          {/* Suspended Bookmaker Market */}
          {suspendedBookmakerMarket && renderMarketSection(
            suspendedBookmakerMarket,
            suspendedBookmakerMarket.market_name || "BOOKMAKER",
            false
          )}

          {/* Other Markets (TO WIN THE TOSS, etc.) */}
          {otherMarkets.map((market) => 
            renderMarketSection(
              market,
              market.market_name || market.name,
              false
            )
          )}

          {/* Fancy Market Header - Show if there are fancy markets */}
          {(fancyMarkets && fancyMarkets.length > 0) || markets.some(m => m.enable_fancy === 1) ? (
            <>
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
              {isFancyLoading ? (
                <div className="row-12" style={{ padding: "10px", textAlign: "center" }}>
                  Loading fancy markets...
                </div>
              ) : fancyError ? (
                <div className="row-12" style={{ padding: "10px", textAlign: "center", color: "red" }}>
                  Error loading fancy markets
                </div>
              ) : (
                fancyMarkets && fancyMarkets.length > 0 && fancyMarkets.map((market, index) => (
            <FancyBetRow
                    key={market._id || market.id || index}
              market={market}
              onBetClick={toggleBottomSheet}
            />
                ))
              )}
            </>
          ) : null}

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
            {selectedBet && (
              <BetSlip
                title={selectedBet.runner_name || "Place Bet"}
                rate={selectedBet.odds?.toFixed(2) || "0"}
                chips={[
                  [10, 20, 25, 50],
                  [100, 200, 500, "1K"],
                  ["2K", "5K", "10K", "25K"],
                ]}
                onCancel={() => {
                  setShowBottomSheet(false);
                  setSelectedBet(null);
                }}
                onSubmit={handleBetSubmit}
                isLoading={isSavingBet}
              />
            )}
          </div>
        </div>

        {/* Existing Bets Table */}
        <div style={{ marginTop: "10px", marginBottom: "50px" }}>
          <div className="tcl">
            <Table columns={columns} data={betsData} />
          </div>
        </div>

        {/* Toast component */}
        <Toast
          message={toastMsg}
          type={toastType}
          onClose={() => setToastMsg("")}
        />
      </section>
    </div>
  );
};

export default GameDetails;
