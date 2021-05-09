import Cardlist from '../../ui/Cardlist';
import { useQuery, QueryClient, UseQueryResult } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getSheets } from '../../service/queryFns';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function MyFavorites() {
  const router = useRouter();
  const { authenticated: isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push(`/`);
    }
  }, [isLoggedIn, router]);

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

  return isLoggedIn ? <Cardlist data={data} title="myfavorites" /> : null;
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
