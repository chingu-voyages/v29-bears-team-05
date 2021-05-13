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

  return (
    <div className="text-gray-700">
      <div className="py-10 bg-gray-700 flex justify-items-center grid grid-cols-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-300 mb-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        <h1 className="text-4xl font-bold text-center text-white md:border-b md:border-green-300 md:pb-3">My Favorites</h1>
      </div>
      {isLoggedIn ? <Cardlist data={data} title="myfavorites" /> : null}
    </div>
  );
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
