import Table from "../../shared/Table";

const Statement = () => {
  const columns = [
    { header: "Date", accessor: "date" },
    { header: "Desc", accessor: "description" },
    { header: "Prev Bal", accessor: "prev_balance" },
    { header: "CR", accessor: "cr" },
    { header: "DR", accessor: "dr" },
    { header: "Comm", accessor: "comm" },
    { header: "Balance", accessor: "balance" },
  ];

  return (
    <div>
      <section className="section">
        <div className="tcl">
          <Table columns={columns} data={[]} />
        </div>
        <div className="pagination-wrapper">
          <div className="pagination">
            <button className="">1</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statement;
