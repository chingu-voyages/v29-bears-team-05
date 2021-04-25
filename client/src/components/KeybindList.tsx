import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import Table from '../ui/Table';

const KeybindList = ({ sheetData = [], columns, titleField }) => {
  const categories = [...new Set(sheetData.map((el) => el[titleField]))];

  return categories.map((title, i) => {
    const tableData = _.filter(sheetData, { categoryId: i + 1 });
    return (
      <Table key={title} title={title} data={tableData} columns={columns} />
    );
  });
};

export default KeybindList;
