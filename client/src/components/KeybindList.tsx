import _ from 'lodash';
import Table from './Table/Table';

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
