import { useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  useQuery,
  UseQueryResult,
  useQueryClient,
  useMutation,
} from 'react-query';
import { jsPDF as JSPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { getSheet, deleteFavorite, getFavorites } from '../../service/queryFns';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';
import { useAuth } from '../../context/AuthContext';
import { TrashIcon } from '../../ui/Icons';
import { useFavs } from '../../context/FavContext';
import Link from 'next/link';
import Token from '../../service/token';

const DeleteButton = ({ record }) => {
  const queryClient = useQueryClient();
  const { setFavs } = useFavs();
  const router = useRouter();
  const { setAuthenticated } = useAuth();

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
    if (Token.hasAuthToken() && Token.isExpired()) {
      alert('Please login to delete favorites');
      router.push(`/`);
      Token.clearAuthToken();
      setAuthenticated(false);
      return;
    }
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

const BindingSet = ({ bindingRef, sheetData, favoritesData }) => {
  const { userFavorites: favorites } = favoritesData.user;
  const favoritesArray = favorites?.map((record) => record.id);
  const { keybinds } = sheetData;

  const filteredByFavsData = useMemo(
    () => keybinds.filter((record) => favoritesArray.includes(record.id)),
    [favoritesArray, keybinds]
  );

  return (
    <div className="mb-20" ref={bindingRef}>
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
  const bindingRef = useRef<any>();

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

  //   const generatePdf = useCallback(() => {
  //     const doc = new jsPDF();

  //     const split = doc.splitTextToSize(
  //       document.getElementById('text').innerText,
  //       200
  //     );
  //     const image = document.getElementById('image').getAttribute('src');
  //     doc.text(document.querySelector('.content > h1').innerHTML, 75, 5);
  //     doc.addImage(image, 70, 7, 60, 60);
  //     doc.text(split, 5, 75);
  //     doc.output('dataurlnewwindow');
  //   }, []);

  const generateImage = useCallback(async () => {
    const image = await toPng(bindingRef.current, { quality: 0.95 });
    const doc = new JSPDF();

    doc.addImage(image, 'JPEG', 5, 22, 240, 160);
    doc.save();
  }, []);

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

  const hasFavs = favoritesData?.user?.userFavorites?.length;

  return (
    <>
      <div className="flex grid content-center grid-cols-1 my-10 text-center justify-items-center">
        <img
          className="mb-2 justify-self-center"
          src={`/images/${sheetName}.png`}
          alt={`${sheetName} logo`}
        />
        <h1 className="text-3xl font-bold text-gray-700 mb-7 lg:text-4xl">
          My Favorite <span className="text-green-400">{sheetName}</span>{' '}
          Shortcuts
        </h1>
        <div className="flex justify-center">
          <Link href={`/sheets/${sheetName}`}>
            <a className="mr-3 text-gray-700 hover:no-underline">
              <button className="flex justify-center px-4 py-2 font-bold text-white bg-gray-700 border border-gray-700 rounded-full hover:text-gray-700 hover:bg-white hover:shadow-lg focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2 text-green-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                {`Main ${sheetName} Sheet`}
              </button>
            </a>
          </Link>
          <button
            onClick={generateImage}
            className="flex justify-center px-4 py-2 font-bold text-white bg-gray-700 border border-gray-700 rounded-full hover:text-gray-700 hover:bg-white hover:shadow-lg focus:outline-none"
          >
            Export to PDF
          </button>
        </div>
      </div>
      {hasFavs ? (
        <>
          <BindingSet
            bindingRef={bindingRef}
            sheetData={sheetData}
            favoritesData={favoritesData}
          />
        </>
      ) : (
        <div className="flex justify-center">
          <p className="mx-11">
            You currently have no favorites. To add {sheetName} favorites, click{' '}
            <Link href={`/sheets/${sheetName}`}>
              <a>here</a>
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Sheet;
