import { useRouter } from 'next/router';

const BindingSet = () => {
    const router = useRouter();
    const { bindingSet } = router.query;

    if (bindingSet) {
        return <div>My favorite keyboard shortcuts from: {bindingSet} </div>;
    } else {
        return null;
    }
};

export default BindingSet;
