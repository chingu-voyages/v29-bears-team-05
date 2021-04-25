import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Accordion, AccordionHeader } from './Accordion';

const Row = ({ record, children }) => {
  return (
    <tr className="py-4 text-left">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, [record])
      )}
    </tr>
  );
};

const TableHeaders = ({ columns = [] }) => {
  return (
    <thead>
      <tr className="text-left">
        {columns.map((column: any) => (
          <th key={column?.header} className="p-2 text-sm sm:text-base">
            {column?.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableRows = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((record) => (
        <Row key={record.id} record={record}>
          {columns.map((column) => (
            <Fragment key={column.header}>
              {React.cloneElement(column.component, { record })}
            </Fragment>
          ))}
        </Row>
      ))}
    </tbody>
  );
};

const TableCollapse = ({ children, title, tableRef }) => {
    const [isOpen, setIsOpen] = useState(true);

  const toggleCollapse = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full max-w-2xl mx-3">
            <AccordionHeader
              onClick={toggleCollapse}
              isOpen={isOpen}
              variant="indigo"
            >
              {title}
            </AccordionHeader>
        </div>
      </div>
      <div className="flex justify-center">
        <Accordion id={title} isOpen={isOpen} tableRef={tableRef}>
          {children}
        </Accordion>
      </div>
    </div>
  );
};

const Table = ({ title, data, columns }) => {
  const tableRef = useRef<HTMLDivElement>(null);
  return (
      <TableCollapse title={title} tableRef={tableRef}>
          <table className="w-full max-w-2xl mx-3 table-fixed">
            <colgroup>
              {columns.map((column) => {
                return <col key={column.header} className={column.colWidth} />;
              })}
            </colgroup>
            <TableHeaders columns={columns} />
            <TableRows data={data} columns={columns} />
          </table>
          </TableCollapse>
  );
};

export default Table;
