import { useRouter } from 'next/router';
import {
  useQuery,
  UseQueryResult,
  useQueryClient,
  useMutation,
} from 'react-query';
import { getSheet, deleteFavorite, getFavorites } from '../../service/queryFns';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useMemo } from 'react';
import { TrashIcon } from '../../ui/Icons';
import { useFavs } from '../../context/FavContext';
import Link from 'next/link';

const DeleteButton = ({ record }) => {
  const queryClient = useQueryClient();
  const { setFavs } = useFavs();
  const mutation = useMutation(() => deleteFavorite(record.id), {
    onSuccess: (data) => {
      queryClient.setQueryData('favorites', (oldData: any) => {
        const keybindings = [...oldData.user.userFavorites];
        keybindings.splice(
          keybindings.findIndex((el) => el.id === record.id),
          1
        );
        oldData.user.userFavorites = keybindings;
        setFavs(oldData.user.userFavorites.map((el) => el.id));
        return oldData;
      });
    },
  });

  const handleDelete = () => {
    mutation.mutate(record.id);
  };

  return (
    <td className="p-2 text-sm sm:text-base">
      <div>
        <button
          aria-label="delete-button"
          onClick={() => {
            //   TODO: Add modal pop-up
            if (
              typeof window !== 'undefined' &&
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
      <div className="flex justify-items-center grid grid-cols-1 my-10 content-center text-center">
        <img className="justify-self-center mb-2" src={`/images/${sheetName}.png`} alt={`${sheetName} logo`} />
        <h1 className="mb-7 text-gray-700 font-bold text-3xl lg:text-4xl">
          My Favorite <span className="text-green-400">{sheetName}</span> Shortcuts
        </h1>
        <Link href={`/sheets/${sheetName}`}>
          <a className="text-gray-700 hover:no-underline">
          <button className="flex justify-center border border-gray-700 bg-gray-700 py-2 px-4 rounded-full text-white font-bold hover:text-gray-700 hover:bg-white hover:shadow-lg focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-300" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          {`Main ${sheetName} Sheet`}
          </button>
          </a>
        </Link>
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

  const { authenticated: isLoggedIn } = useAuth();

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
