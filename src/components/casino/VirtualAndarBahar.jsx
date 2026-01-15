import React from "react";

const VirtualAndarBahar = () => {
  return (
    <section className="section">
      <iframe
        src="/ab/index.html"
        scrolling="none"
        style={{
          border: "none",
          width: "100%",
          height: "100vh",
          backgroundColor: "black",
        }}
        title="Virtual Andar Bahar"
      ></iframe>
    </section>
  );
};

export default VirtualAndarBahar;
