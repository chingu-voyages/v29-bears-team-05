import { useRouter } from 'next/router';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import axios from 'axios';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';
import config from '../../config';


const FavoriteButton = () => (
  <td className="text-sm sm:text-base p-2">
    <button>🤍</button>
  </td>
);

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

const getSheet = async () => {
  const sheetId = 1;
  const res = await axios(`${config.API_ENDPOINT}/sheet/${sheetId}`);
  return res.data;
};

const Sheet = () => {
  const router = useRouter();
  const { sheetName } = router.query;

  const { isError, isLoading, data, error } = useQuery('sheet', getSheet);

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

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('sheet', getSheet);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Sheet;
