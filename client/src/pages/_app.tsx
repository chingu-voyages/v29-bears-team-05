import { useRef } from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/global.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { AuthProvider } from '../context/AuthContext';
import { FavsProvider } from '../context/FavContext';

export default function App({ Component, pageProps }: AppProps) {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <FavsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FavsProvider>
        </AuthProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
