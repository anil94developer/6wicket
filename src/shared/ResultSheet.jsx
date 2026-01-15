import React from "react";

const ResultSheet = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      <div
        className={`backdrop ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>
      <div className={`bottom-sheet ${isOpen ? "show" : ""}`}>
        <div className="sheet-header" onClick={onClose}>
          ✖
        </div>
        <h3 style={{ background: "chocolate", padding: "5px" }}> {title}</h3>
        <table className="bettable">{children}</table>
      </div>
    </>
  );
};

export default ResultSheet;
