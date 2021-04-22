import { useRouter } from 'next/router';
import KeybindList from '../../components/KeybindList';
import Table from '../../components/Table/Table';
import data from '../../lib/mockData/index'

const Sheet = () => {
    const router = useRouter();
    const { sheetName } = router.query;

    const sheetData = data?.find(list => list[0].cheatsheet === sheetName)


    if (sheetData) {
        return (
            <div className='mb-20'>
                <div className="text-center">
                    <h1 className="text-3xl lg:text-4xl my-12">
                        {sheetName} keyboard shortcuts{' '}
                    </h1>
                </div>
                <KeybindList
                    sheetData={sheetData}
                    headers={['Shortcut', 'Description', 'Likes', '❤️']}
                    categoryField='cheatsheetCategory'
                />
            </div>
        );
    } else {
        return null;
    }
};

export default Sheet;
