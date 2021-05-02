import Cardlist from '../../ui/Cardlist';
import { useQuery, QueryClient, UseQueryResult } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getSheets } from '../../service/queryFns';

export default function MyFavorites() {
  const {
    isError,
    isLoading,
    data,
    error,
  }: UseQueryResult<unknown, { message: string }> = useQuery(
    'sheets',
    getSheets
  );

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }
  return <Cardlist data={data} title="myfavorites" />;
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
