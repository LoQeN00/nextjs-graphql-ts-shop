import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient, Hydrate } from '@tanstack/react-query';
import { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import { CartContextProvider } from '../components/Cart/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/apolloClient';
import { SessionProvider } from 'next-auth/react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <CartContextProvider>
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
          </CartContextProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
