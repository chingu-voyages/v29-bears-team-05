import Cardlist from '../../ui/Cardlist';
import { useQuery, QueryClient, UseQueryResult } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getSheets } from '../../service/queryFns';

export default function Sheets() {
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
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
        <h1 className="text-4xl font-bold text-center text-white md:border-b md:border-green-300 md:pb-3">All Keybinding Sheets</h1>
      </div>
      <Cardlist data={data} title="sheets" />
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
