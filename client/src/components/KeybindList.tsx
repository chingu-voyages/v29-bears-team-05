import React, { useMemo } from 'react';
import _ from 'lodash';
import Table from '../ui/Table';

type Props = {
  sheetData: any[];
  columns: any;
  titleField: string;
};

const KeybindList = ({ sheetData, columns, titleField }: Props) => {
  // makes sure categories always in original order
  const categories = useMemo(() => {
    if (!sheetData) return [];

    return _.uniqBy(sheetData, (el) => el[titleField].name)
      .sort((a, b) => (a[titleField].index > b[titleField].index ? 1 : -1))
      .map((el) => el[titleField].name);
  }, [sheetData, titleField]);

  if (!sheetData.length) {
    return null;
  }

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
