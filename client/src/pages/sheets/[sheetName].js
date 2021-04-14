import { useRouter } from 'next/router';

const Sheet = () => {
    const router = useRouter();
    const { sheetName } = router.query;

    if (sheetName) {
        return <div>cheatsheet: {sheetName} </div>;
    } else {
        return null;
    }
};

export default Sheet;
