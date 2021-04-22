import TableHeaders from './TableHeaders';
import TableRows from './TableRows';

const Table = ({ category, tableData, headers }) => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl mx-3">
          <h1 className="mt-11 mb-3 text-2xl p-2">{category}</h1>
        </div>
      </div>
      <div className="flex justify-center">
        <table className="table-fixed w-full max-w-2xl mx-3">
          <colgroup>
            <col className="w-5/12"></col>
            <col className="w-7/12"></col>
            <col className="w-2/12"></col>
            <col className="w-2/12"></col>
          </colgroup>
          <TableHeaders headers={headers} />
          <TableRows tableData={tableData} />
        </table>
      </div>
    </div>
  );
};

export default Table;
