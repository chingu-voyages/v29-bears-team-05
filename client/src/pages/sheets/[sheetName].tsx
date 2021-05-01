import { useRouter } from 'next/router';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';
import data from '../../lib/mockData/index';

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

  const sheetData = data?.find((list) => list[0].cheatsheet === sheetName);

  if (sheetData) {
    return (
      <div className="mb-20">
        <div className="text-center">
          <h1 className="my-12 text-3xl lg:text-4xl">
            {sheetName} keyboard shortcuts{' '}
          </h1>
        </div>
        <KeybindList
          sheetData={sheetData}
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
