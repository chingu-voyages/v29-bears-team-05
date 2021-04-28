import Cardlist from '../../ui/Cardlist';
import axios from 'axios';
import { useQuery, QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import config from '../../config';

const getSheets = async () => {
  const res = await axios(`${config.API_ENDPOINT}/sheet`);
  return res.data;
};

export default function Sheets() {
  const { isError, isLoading, data, error } = useQuery('sheets', getSheets);

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return <Cardlist data={data} />;
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('sheets', getSheets);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
