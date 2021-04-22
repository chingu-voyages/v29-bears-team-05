const TextField = ({ record, source }) => {
  return (
    <td className="text-sm sm:text-base p-2">
      <span>{record[source]}</span>
    </td>
  );
};

export default TextField;
