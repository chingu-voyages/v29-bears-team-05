import { useRouter } from 'next/router';
import KeybindList from '../../components/KeybindList';
import data from '../../lib/mockData/index'

const Sheet = () => {
    const router = useRouter();
    const { sheetName } = router.query;

    const sheetData = data?.find(list => list[0].cheatsheet === sheetName)

    if (sheetName) {
        return (
            <div>
                <KeybindList data={sheetData} master={true} />
            </div>
        );
    } else {
        return null;
    }
};

export default Sheet;
