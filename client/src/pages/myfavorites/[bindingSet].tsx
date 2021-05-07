import { useRouter } from 'next/router';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import { getSheet, deleteFavorite, getFavorites } from '../../service/queryFns';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { TrashIcon } from '../../ui/Icons';
import { useFavs } from '../../context/FavContext';

const DeleteButton = ({ record }) => {
  const handleDelete = () => {
    deleteFavorite(record.id);
    // then need to update view to reflect change
  };

  return (
    <td className="p-2 text-sm sm:text-base">
      <div>
        <button
          aria-label="delete-button"
          onClick={() => {
            if (
              window.confirm('Are you sure you want to delete this keybinding?')
            ) {
              handleDelete();
            }
          }}
        >
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
    header: ' ',
    component: <DeleteButton record />,
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

  const { data: favoritesData } = useQuery('favorites', getFavorites);

  // const favoritesData: any = queryClient.getQueryData('favorites');

  // const { favs, setFavs } = useFavs();
  // console.log('favs', favs);
  // const favoritesData = favs;

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
  }: UseQueryResult<{ keybinds: any[] }, { message: string }> = useQuery(
    ['sheet', id],
    () => getSheet(id)
  );
  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  if (data && isLoggedIn) {
    const sheetData = () => {
      const result = data?.keybinds?.filter((record) => {
        // return favs?.includes(record.id) ? record : null;
        return favoritesArray?.includes(record.id) ? record : null;
      });
      return result;
    };
    return (
      <div className="mb-20">
        <div className="text-center">
          <h1 className="my-12 text-3xl lg:text-4xl">
            My favorite {bindingSet} keyboard shortcuts
          </h1>
        </div>
        <KeybindList
          sheetData={sheetData()}
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
