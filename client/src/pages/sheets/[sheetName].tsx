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
        <div className="text-center">
          <h1 className="my-12 text-3xl lg:text-4xl">
            {sheetName} keyboard shortcuts
          </h1>
        </div>
        <Link href={`/myfavorites/${sheetName}`}>favorites for this sheet</Link>
        <form>
          <KeybindList
            sheetData={data.keybinds}
            columns={adjustedColumns}
            titleField="cheatsheetCategory"
          />
          <div className="flex justify-center px-4 mt-11">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!favs || !favs.length}
              className={`${
                favs?.length
                  ? 'bg-gray-700 text-white  hover:shadow-lg'
                  : 'bg-gray-300 text-gray-100 '
              } w-full max-w-md px-6 py-3 mb-1 mr-1 text-sm font-bold uppercase transition-all duration-150 ease-linear rounded shadow outline-none mt-11 focus:outline-none`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return null;
  }
};

export default Sheet;
