import { useRouter } from 'next/router';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import { addFavorites, getSheet } from '../../service/queryFns';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';
import { useState } from 'react';
import { useFavs } from '../../context/FavContext';
import Link from 'next/link';
import { HeartIcon } from '../../ui/Icons';
import { useAuth } from '../../context/AuthContext';
import Token from '../../service/token';

const FavoriteButton = ({ record }) => {
  const context = useFavs();
  const { favs, setFavs } = context;
  const initialState = favs?.includes(record.id);
  const [active, setActive] = useState(initialState);

  const handleClick = (e) => {
    if (!active) {
      setFavs((prev) => [...prev, record.id]);
    } else {
      const arr = favs ? [...favs] : [];
      arr.splice(
        arr.findIndex((el) => el === record.id),
        1
      );
      setFavs(arr);
    }
    setActive((prev) => !prev);
  };

  return (
    <td className="p-2 text-sm sm:text-base">
      <div>
        <label className="flex cursor-pointer">
          <HeartIcon color={active ? '#c71423' : 'white'} />
          <input
            className="invisible"
            type="checkbox"
            checked={active}
            name={record.id}
            onChange={handleClick}
          />
        </label>
      </div>
    </td>
  );
};

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
    header: ' ',
    component: <FavoriteButton record />,
    colWidth: 'w-3',
  },
];

const Sheet = () => {
  const router = useRouter();
  const { sheetName } = router.query;

  const queryClient = useQueryClient();

  const sheetsData = queryClient.getQueryData<any[]>('sheets');
  const sheetRecord = sheetsData?.find((sheet) => sheet.name === sheetName);
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

  const { authenticated: isLoggedIn, setAuthenticated } = useAuth();

  const { favs } = useFavs();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!favs) return;
    if (Token.hasAuthToken() && Token.isExpired()) {
      alert('Please login to add favorites');
      router.push(`/`);
      Token.clearAuthToken();
      setAuthenticated(false);
      return;
    }
    await addFavorites(favs);
    router.push(`/myfavorites/${sheetName}`);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const adjustedColumns = isLoggedIn ? columns : columns.slice(0, 3);
  adjustedColumns[2].colWidth = 'w-4';

  if (data) {
    return (
      <div className="mb-20">
        <div className="flex justify-items-center grid grid-cols-1 my-10 content-center text-center">
          <img
            className="justify-self-center mb-2"
            src={`/images/${sheetName}.png`}
            alt={`${sheetName} logo`}
          />
          <h1 className="mb-7 text-gray-700 font-bold text-3xl lg:text-4xl">
            {sheetName} Shortcuts
          </h1>
          {isLoggedIn ? (
            <Link href={`/myfavorites/${sheetName}`}>
              <a className="text-gray-700 hover:no-underline">
                <button className="flex justify-center border border-gray-700 bg-gray-700 py-2 px-4 rounded-full text-white font-bold hover:text-gray-700 hover:bg-white hover:shadow-lg focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-300 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {`My ${sheetName} Favorites`}
                </button>
              </a>
            </Link>
          ) : (
            <div className="text-gray-700">
              <span className="font-bold">Log In</span> or{' '}
              <span className="font-bold">Sign Up </span>to create your
              favorites list!
            </div>
          )}
        </div>
        <form>
          <KeybindList
            sheetData={data.keybinds}
            columns={adjustedColumns}
            titleField="cheatsheetCategory"
          />
          {isLoggedIn ? (
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!favs || !favs.length}
                className={`w-60 md:w-80 max-w-md px-6 py-3 mt-20 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear rounded shadow outline-none focus:outline-none
                bg-green-300 text-gray-700
                ${
                  favs?.length
                    ? 'hover:shadow-lg'
                    : 'bg-opacity-40 text-opacity-40 cursor-auto'
                }
                `}
              >
                Save
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default Sheet;
