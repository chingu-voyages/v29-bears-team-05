import { useRouter } from 'next/router';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import { getSheet, deleteFavorite, getFavorites } from '../../service/queryFns';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useMemo } from 'react';
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
            //   TODO: Add modal pop-up
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

const BindingSet = ({ sheetData, favoritesData, sheetName }) => {
  const { userFavorites: favorites } = favoritesData.user;
  const favoritesArray = favorites?.map((record) => record.id);
  const { keybinds } = sheetData;

  const filteredByFavsData = useMemo(
    () => keybinds.filter((record) => favoritesArray.includes(record.id)),
    [favoritesArray, keybinds]
  );

  return (
    <div className="mb-20">
      <div className="text-center">
        <h1 className="my-12 text-3xl lg:text-4xl">
          My favorite {sheetName} keyboard shortcuts
        </h1>
      </div>
      <KeybindList
        sheetData={filteredByFavsData}
        columns={columns}
        titleField="cheatsheetCategory"
      />
    </div>
  );
};

const Sheet = () => {
  const router = useRouter();
  const { bindingSet: sheetName } = router.query;

  const isLoggedIn = useAuth();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push(`/`);
    }
  }, [isLoggedIn, router]);

  const queryClient = useQueryClient();

  const { data: favoritesData } = useQuery('favorites', getFavorites);

  const sheetsData: any = queryClient.getQueryData('sheets');
  const sheetRecord = sheetsData?.find((sheet) => sheet.name === sheetName);

  const {
    isError,
    isLoading,
    data: sheetData,
    error,
  }: UseQueryResult<{ keybinds: any[] }, { message: string }> = useQuery(
    ['sheet', sheetRecord?.id],
    () => getSheet(sheetRecord?.id)
  );
  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  if (!sheetData || !isLoggedIn) {
    return null;
  }

  if (!favoritesData) {
    return <div>Add favorites: Click here!</div>;
  }

  return (
    <BindingSet
      sheetData={sheetData}
      favoritesData={favoritesData}
      sheetName={sheetName}
    />
  );
};

export default Sheet;
