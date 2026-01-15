import React from "react";

const ColorGame = () => {
  return (
    <section className="section">
      <iframe
        src="/color-game/index.html"
        scrolling="none"
        style={{
          border: "none",
          width: "100%",
          height: "100vh",
          backgroundColor: "black",
        }}
        title="Color Game"
      ></iframe>
    </section>
  );
};

export default ColorGame;
