const TextField = ({ record, source }: { record?: any; source: string }) => {
  return (
    <td className="p-2 text-sm sm:text-base">
      <span>{record[source]}</span>
    </td>
  );
};

export default TextField;
