import React from 'react';
import _ from 'lodash';
import TextField from './Textfield';

const HeartButton = () => (
  <td className="text-sm sm:text-base p-2">
    <button>🤍</button>
  </td>
);

const Row = ({ record, children }) => {
  return (
    <tr className="text-left py-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, [record])
      )}
    </tr>
  );
};

const TableHeaders = ({ headers = [] }) => {
  return (
    <thead>
      <tr className="text-left">
        {headers.map((header) => (
          <th key={header} className="text-sm sm:text-base p-2">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableRows = ({ tableData }) => {
  return (
    <tbody>
      {tableData.map((record) => {
        return (
          <Row key={record.id} record={record}>
            <TextField record={record} source="keyCombination" />
            <TextField record={record} source="description" />
            <TextField record={record} source="likes" />
            <HeartButton />
          </Row>
        );
      })}
    </tbody>
  );
};

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
            <col className="w-7/12"></col>
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

const KeybindList = ({ sheetData = [], headers, categoryField }) => {
  const categoryNames = [...new Set(sheetData.map((el) => el[categoryField]))];

  return categoryNames.map((category, i) => {
    const tableData = _.filter(sheetData, { categoryId: i + 1 });
    return (
      <Table
        key={category}
        category={category}
        tableData={tableData}
        headers={headers}
      />
    );
  });
};

export default KeybindList;
