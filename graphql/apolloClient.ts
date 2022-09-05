import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api-us-west-2.hygraph.com/v2/cl5me6ad9524n01uofjrw3hi2/master',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy(currentFetchPolicy) {
        if (currentFetchPolicy === 'network-only' || currentFetchPolicy === 'cache-and-network') {
          return 'cache-first';
        }
        return currentFetchPolicy;
      },
    },
  },
});

export const authorizedClient = new ApolloClient({
  uri: 'https://api-us-west-2.hygraph.com/v2/cl5me6ad9524n01uofjrw3hi2/master',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});
