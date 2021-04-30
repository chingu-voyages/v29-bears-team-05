import { useRouter } from 'next/router';
import { useQuery, QueryClient, useQueryClient } from 'react-query';
import { getFavorites, getSheet } from '../../service/queryFns';
import KeybindList from '../../components/KeybindList';
import TextField from '../../components/Textfield';

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
];

const Sheet = () => {
    const router = useRouter();
    const { bindingSet } = router.query;

    const { data: response } = useQuery('favorites', getFavorites);
    const user = response?.user;
    const favorites = user?.userFavorites;
    const favoritesArray = favorites?.map(record => record.id);

    const queryClient = useQueryClient();

    const sheetsData = queryClient.getQueryData('sheets');
    const sheetRecord = sheetsData?.find(sheet => sheet.name === bindingSet);
    const id = sheetRecord?.id;

    const { isError, isLoading, data, error } = useQuery(['sheet', id], () => getSheet(id));

    if (isLoading) return <div>Loading...</div>;

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    if (data) {
        return (
            <div className="mb-20">
                <div className="text-center">
                    <h1 className="my-12 text-3xl lg:text-4xl">
                        My favorite {bindingSet} keyboard shortcuts
          </h1>
                </div>
                <KeybindList
                    sheetData={data?.filter(record => favoritesArray?.includes(record.id) ? record : null)}
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
