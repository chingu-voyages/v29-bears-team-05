import React from 'react';
const Row = ({ record, children }) => {
  return (
    <tr className="text-left py-4">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, [record])
      )}
    </tr>
  );
};

export default Row;
