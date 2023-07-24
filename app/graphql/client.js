import { ApolloClient, InMemoryCache } from '@apollo/client';
import splitLink from './webSocket';
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({ addTypename: false }),
  queryDeduplication: true,
  /* You can override any default option you 
     specify in this object by providing a different value
     for the same option in individual function calls. 
  */
  defaultOptions,
});

export default client;
