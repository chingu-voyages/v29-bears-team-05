import { useRouter } from 'next/router';
import { useQuery, QueryClient, useQueryClient } from 'react-query';
import { getSheet } from '../../service/queryFns';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';

const FavoriteButton = () => (
  <td className="p-2 text-sm sm:text-base">
    <button>🤍</button>
  </td>
);

type Column = { header: string; component: React.ReactNode; colWidth: string };

const columns: Column[] = [
  {
    header: 'Shortcut',
    component: <TextField source="keyCombination" />,
    colWidth: 'w-7',
  },
  {
    header: 'Description',
    component: <TextField source="description" />,
    colWidth: 'w-7',
  },
  {
    header: 'Likes',
    component: <TextField source="likes" />,
    colWidth: 'w-2',
  },
  {
    header: '❤️',
    component: <FavoriteButton />,
    colWidth: 'w-3',
  },
];

const Sheet = () => {
  const router = useRouter();
  const { sheetName } = router.query;

  const queryClient = useQueryClient();

  const sheetsData = queryClient.getQueryData('sheets');
  const sheetRecord = sheetsData?.find((sheet) => sheet.name === sheetName);
  const id = sheetRecord?.id;

  const { isError, isLoading, data, error } = useQuery(['sheet', id], () =>
    getSheet(id)
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (data) {
    return (
      <div className="mb-20">
        <div className="text-center">
          <h1 className="my-12 text-3xl lg:text-4xl">
            {sheetName} keyboard shortcuts
          </h1>
        </div>
        <KeybindList
          sheetData={data}
          columns={columns}
          titleField="cheatsheetCategory"
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Sheet;
