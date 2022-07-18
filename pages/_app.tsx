import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import { CartContextProvider } from '../components/Cart/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/apolloClient';


function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </Layout>
        </Hydrate>
      </CartContextProvider>
    </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
