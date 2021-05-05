import { useRouter } from 'next/router';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import { getSheet } from '../../service/queryFns';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { TrashIcon } from '../../ui/Icons';

const DeleteButton = () => {
  return (
    <td className="p-2 text-sm sm:text-base">
      <div>
        <button>
          <TrashIcon />
        </button>
      </div>
    </td>
  );
};

const columns = [
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
    header: <TrashIcon />,
    component: <DeleteButton />,
    colWidth: 'w-3',
  },
];

const Sheet = () => {
  const router = useRouter();
  const { bindingSet } = router.query;

  const isLoggedIn = useAuth();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push(`/`);
    }
  }, [isLoggedIn, router]);

  const queryClient = useQueryClient();

  const favoritesData: any = queryClient.getQueryData('favorites');

  const user = favoritesData?.user;
  const favorites = user?.userFavorites;
  const favoritesArray = favorites?.map((record) => record.id);

  const sheetsData: any = queryClient.getQueryData('sheets');
  const sheetRecord = sheetsData?.find((sheet) => sheet.name === bindingSet);
  const id = sheetRecord?.id;

  const {
    isError,
    isLoading,
    data,
    error,
  }: UseQueryResult<any[], { message: string }> = useQuery(['sheet', id], () =>
    getSheet(id)
  );
  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  if (data && isLoggedIn) {
    return (
      <div className="mb-20">
        <div className="text-center">
          <h1 className="my-12 text-3xl lg:text-4xl">
            My favorite {bindingSet} keyboard shortcuts
          </h1>
        </div>
        <KeybindList
          sheetData={data?.filter((record) =>
            favoritesArray?.includes(record.id) ? record : null
          )}
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
