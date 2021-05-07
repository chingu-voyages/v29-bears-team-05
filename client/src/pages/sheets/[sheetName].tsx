import { useRouter } from 'next/router';
import { useQuery, UseQueryResult, useQueryClient } from 'react-query';
import { addFavorites, getSheet } from '../../service/queryFns';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';
import { useState } from 'react';
import { FavsProvider, useFavs } from '../../context/FavContext';
import Link from 'next/link';

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
        <label className="cursor-pointer">
          {active ? '❤️' : '🤍'}
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

  const { favs } = useFavs();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!favs) return;

    console.log('clicked submit');
    console.log('favs', favs);
    addFavorites(favs);
    // route to favs sheet ?
    router.push(`/myfavorites/${sheetName}`);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  if (data) {
    return (
      <div className="mb-20">
        <div className="text-center">
          <h1 className="my-12 text-3xl lg:text-4xl">
            {sheetName} keyboard shortcuts
          </h1>
        </div>
        <Link href={`/myfavorites/${sheetName}`}>favorites for this sheet</Link>
        {/* <FavsProvider> */}
        <form>
          <KeybindList
            sheetData={data.keybinds}
            columns={columns}
            titleField="cheatsheetCategory"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!favs || !favs.length}
              className="w-full max-w-md px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-gray-700 rounded shadow outline-none mt-11 hover:shadow-lg focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
        {/* </FavsProvider> */}
      </div>
    );
  } else {
    return null;
  }
};

export default Sheet;
