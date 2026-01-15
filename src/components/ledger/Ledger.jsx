import React from "react";
import Table from "../../shared/Table";

const Ledger = () => {
  const columns = [
    { header: "Match Name", accessor: "match_name" },
    { header: "Won by", accessor: "won_by" },
    { header: "Won", accessor: "won" },
    { header: "Lost", accessor: "lost" },
    { header: "Balance", accessor: "balance" },
  ];

  const data = [
    {
      match_name: (
        <>
          Desert Vipers v MI Emirates
          <br />
          30 Dec 11:50 PM
        </>
      ),
      won_by: "🏆 Desert Vipers",
      won: "0",
      lost: <span style={{ color: "rgb(255, 121, 91)" }}>- 612</span>,
      balance: "-515",
    },
    {
      match_name: (
        <>
          Dt20 30-12-2025
          <br />
          30 Dec 06:51 PM
        </>
      ),
      won_by: "🏆 N/A",
      won: <span style={{ color: "rgb(49, 216, 173)" }}>+ 97</span>,
      lost: "0",
      balance: "97",
    },
  ];

  return (
    <section className="section">
      <div className="tcl">
        <Table columns={columns} data={data} />
      </div>
    </section>
  );
};

export default Ledger;
