import React, { useState, useEffect } from "react";

const BetSlip = ({
  title,
  rate,
  chips = [], // Default empty array
  onCancel,
  onSubmit,
  isLoading = false,
}) => {
  const [amount, setAmount] = useState("");

  // Reset amount when the title (game/number) changes
  useEffect(() => {
    setAmount("");
  }, [title]);

  const handleAmountClick = (val) => {
    let newAmount = val;
    if (typeof val === "string" && val.includes("K")) {
      newAmount = parseFloat(val.replace("K", "")) * 1000;
    }
    setAmount(newAmount);
  };

  return (
    <div className="sheet-content">
      {/* Dynamic Title */}
      <h3>{title}</h3>

      <div className="mrow-2">
        {/* Dynamic Rate */}
        <label>Rate : {rate}</label>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Dynamic Chips Loop */}
      {chips.map((row, rowIndex) => (
        <div className="button-grid" key={rowIndex}>
          {row.map((val) => (
            <button key={val} onClick={() => handleAmountClick(val)}>
              {val}
            </button>
          ))}
        </div>
      ))}

      <div className="mrow-5">
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        {/* Helper to show potential win (Amount * Rate) */}
        <strong style={{ lineHeight: "4" }}>
          {amount ? (amount * parseFloat(rate || 1)).toFixed(0) : "0"}
        </strong>
        <button 
          className="submit-btn" 
          onClick={() => onSubmit(amount)}
          disabled={isLoading || !amount || parseFloat(amount) <= 0}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default BetSlip;
