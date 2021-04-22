import HeartButton from './HeartButton';
import Row from './Row';
import TextField from './Textfield';

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

export default TableRows;
