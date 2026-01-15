import React from "react";
import Table from "../../shared/Table";

const CompletedGames = () => {
  const columns = [
    { header: "Match Name", accessor: "match_name" },
    { header: "Match Amt", accessor: "match_amt" },
    { header: "Match Comm", accessor: "match_comm" },
    { header: "Session Amt", accessor: "session_amt" },
    { header: "Session Comm", accessor: "session_comm" },
    { header: "Total Comm", accessor: "total_comm" },
    { header: "Total P/L", accessor: "total_pl" },
    { header: "Winner", accessor: "winner" },
    { header: "Declared", accessor: "declared" },
  ];

  const data = [
    {
      match_name: (
        <>
          Desert Vipers v MI Emirates
          <br />
          30 Dec 08:00 PM
        </>
      ),
      match_amt: <span className="text-success">0</span>,
      match_comm: <span className="text-success">0</span>,
      session_amt: <span className="text-danger">-630</span>,
      session_comm: <span className="text-success">18</span>,
      total_comm: <span className="text-success">18</span>,
      total_pl: <span className="text-danger">-630</span>,
      winner: "🏆 Desert Vipers",
      declared: "YES",
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

export default CompletedGames;
