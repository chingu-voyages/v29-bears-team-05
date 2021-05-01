import React, { Fragment, useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import Table from '../ui/Table';

type Props = {
  sheetData: any[];
  columns: any;
  titleField: string;
};

const KeybindList = ({ sheetData, columns, titleField }: Props) => {
  const categories = useMemo(
    () => Array.from(new Set(sheetData.map((el) => el[titleField]))),
    [sheetData, titleField]
  );

  return (
    <React.Fragment>
      {categories.map((title, i) => {
        const tableData = _.filter(sheetData, { categoryId: i + 1 });
        return (
          <Table key={i} title={title} data={tableData} columns={columns} />
        );
      })}
    </React.Fragment>
  );
};

export default KeybindList;
