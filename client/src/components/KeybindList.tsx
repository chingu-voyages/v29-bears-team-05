import React, { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import Table from '../ui/Table';

const KeybindList = ({ sheetData = [], columns, titleField }) => {
  const categories = [...new Set(sheetData.map((el) => el[titleField].name))];

  return categories.map((title, i) => {
    const tableData = _.filter(sheetData, { cheatsheetCategory: { index: i } });
    return (
      <Table key={title} title={title} data={tableData} columns={columns} />
    );
  });
};

export default KeybindList;
