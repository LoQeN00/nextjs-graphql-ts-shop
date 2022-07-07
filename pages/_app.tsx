import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
