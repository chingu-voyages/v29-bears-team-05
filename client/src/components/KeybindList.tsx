import { Fragment } from 'react';

const KeybindList = ({ data = [], master }) => {
  const headers = master
    ? ['Shortcut', 'Description', 'Likes', '❤️']
    : ['Shortcut', 'Description'];

  const categoryNames = [...new Set(data.map((el) => el.cheatsheetCategory))];

  const renderHeaders = () => {
    return (
      <tr className="text-left">
        {headers.map((header) => (
          <th key={header} className="w-2">
            {header}
          </th>
        ))}
      </tr>
    );
  };

  const renderKeybindingRow = (id) => {
    const rowData = data.find((el) => el.id === id);
    const { keyCombination, description, likes } = rowData;

    return (
      <Fragment key={id}>
        <td>{keyCombination}</td>
        <td>{description}</td>
        {master ? (
          <>
            <td>{likes}</td>
            <td>
              <button>🤍</button>
            </td>
          </>
        ) : null}
      </Fragment>
    );
  };

  const renderKeybindingRows = (categoryName) => {
    const rows = data.filter((row) => row.cheatsheetCategory === categoryName);

    return rows.map((el) => <tr key={el.id}>{renderKeybindingRow(el.id)}</tr>);
  };

  const renderCategories = () => {
    return categoryNames.map((name) => (
      <Fragment key={name}>
        <tr className="text-left">
          <th>{name}</th>
        </tr>
        {renderHeaders()}
        {renderKeybindingRows(name)}
      </Fragment>
    ));
  };

  return (
    <div className="flex justify-center">
      <table className="table-fixed w-full max-w-2xl mx-3 ">
        <caption className="text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl my-12">
            {data[0].cheatsheet} keyboard shortcuts{' '}
          </h1>
        </caption>
        <colgroup>
          <col className="w-5/12"></col>
          <col className="w-5/12"></col>
          {master ? (
            <>
              <col className="w-1/12"></col>
              <col className="w-1/12"></col>
            </>
          ) : null}
        </colgroup>
        <tbody>{renderCategories()}</tbody>
      </table>
    </div>
  );
};

export default KeybindList;
