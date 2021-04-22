const TableHeaders = ({ headers = [] }) => {
  return (
    <thead>
      <tr className="text-left">
        {headers.map((header) => (
          <th key={header} className='text-sm sm:text-base p-2'>{header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
