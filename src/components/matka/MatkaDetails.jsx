import { useState } from "react";
import BetSlip from "../../shared/BetSlip";

const MatkaDetails = () => {
  // const { id } = useParams();
  const [activeTab, setActiveTab] = useState("single");
  const [showBets, setShowBets] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  // const [betAmount, setBetAmount] = useState("");
  const [bets, setBets] = useState([]);

  // Generate numbers 0-99
  const singlePattiNumbers = Array.from({ length: 100 }, (_, i) => i);
  const andarBaharNumbers = Array.from({ length: 10 }, (_, i) => i);

  const handleNumberClick = (num, type) => {
    setSelectedNumber({ val: num, type });
    // Reset amount logic is now handled inside BetSlip useEffect
  };

  // This function is now called by the BetSlip component
  const handlePlaceBet = (amount) => {
    if (!amount || !selectedNumber) return;

    const newBet = {
      number: selectedNumber.val,
      type: selectedNumber.type === "single" ? "Single" : selectedNumber.type,
      amount: amount,
      date: new Date().toLocaleTimeString(),
    };

    setBets([newBet, ...bets]);
    setSelectedNumber(null);
  };

  return (
    <section className="section">
      <div className="match-info">
        <div className="match-time">FARIDABAD-01-01-2026</div>
        <div className="venue">
          Open at : 01 Jan 09:00 AM | Closes at : 01 Jan 05:15 PM
        </div>
      </div>

      <div className="mtcontainer">
        <div className="tabs">
          <div
            className={`tab ${activeTab === "single" ? "active" : ""}`}
            onClick={() => setActiveTab("single")}
          >
            Single Patti
          </div>
          <div
            className={`tab ${activeTab === "andar_bahar" ? "active" : ""}`}
            onClick={() => setActiveTab("andar_bahar")}
          >
            Andar Bahar
          </div>
        </div>

        {activeTab === "single" && (
          <div className="tab-content active">
            <div className="mtbutton-grid">
              {singlePattiNumbers.map((num) => (
                <button
                  key={num}
                  className="mtbutton"
                  onClick={() => handleNumberClick(num, "single")}
                >
                  {num.toString()}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "andar_bahar" && (
          <div className="tab-content active">
            <h3 style={{ textAlign: "center", padding: "20px" }}>
              Harup Andar
            </h3>
            <div className="mtbutton-grid">
              {andarBaharNumbers.map((num) => (
                <button
                  key={`andar-${num}`}
                  className="mtbutton"
                  onClick={() => handleNumberClick(num, "Andar")}
                >
                  {num}
                </button>
              ))}
            </div>
            <h3 style={{ textAlign: "center", padding: "20px" }}>
              Harup Bahar
            </h3>
            <div className="mtbutton-grid">
              {andarBaharNumbers.map((num) => (
                <button
                  key={`bahar-${num}`}
                  className="mtbutton"
                  onClick={() => handleNumberClick(num, "Bahar")}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "50px" }}>&nbsp;&nbsp;</div>
      <button className="open-btn" onClick={() => setShowBets(true)}>
        Show Bets
      </button>

      {/* Internal Bets Bottom Sheet (Existing Code) */}
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
              <th>Number</th>
              <th>Type</th>
              <th>Amt</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bets.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  No bets placed
                </td>
              </tr>
            ) : (
              bets.map((bet, index) => (
                <tr key={index}>
                  <td>{bet.number}</td>
                  <td>{bet.type}</td>
                  <td>{bet.amount}</td>
                  <td>{bet.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- INTEGRATION START: Place Bet Bottom Sheet --- */}
      <div
        className={`backdrop ${selectedNumber ? "show" : ""}`}
        onClick={() => setSelectedNumber(null)}
      ></div>
      <div className={`bottom-sheet ${selectedNumber ? "show" : ""}`}>
        <div className="sheet-header" onClick={() => setSelectedNumber(null)}>
          ✖
        </div>

        {/* Only render BetSlip if a number is selected */}
        {selectedNumber && (
          <BetSlip
            title={`NUMBER ${selectedNumber.val} ${
              selectedNumber.type !== "single" ? `(${selectedNumber.type})` : ""
            }`}
            rate="90"
            chips={[
              [10, 20, 25, 50],
              [100, 200, 500, "1K"],
            ]}
            onCancel={() => setSelectedNumber(null)}
            onSubmit={handlePlaceBet}
          />
        )}
      </div>
      {/* --- INTEGRATION END --- */}
    </section>
  );
};

export default MatkaDetails;
