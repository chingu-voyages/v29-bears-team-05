import React, { useMemo } from 'react';
import _ from 'lodash';
import Table from '../ui/Table';

type Props = {
  sheetData: any[];
  columns: any;
  titleField: string;
};

const KeybindList = ({ sheetData, columns, titleField }: Props) => {
  const categories = useMemo(
    () => Array.from(new Set(sheetData.map((el) => el[titleField].name))),
    [sheetData, titleField]
  );

  return (
    <div>
      {categories.map((title, i) => {
        const tableData = _.filter(sheetData, {
          [titleField]: { name: title },
        });
        return (
          <Table key={i} title={title} data={tableData} columns={columns} />
        );
      })}
    </div>
  );
};

export default KeybindList;
