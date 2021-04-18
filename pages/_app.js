import '../styles/index.scss';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://graphql-api-2021.herokuapp.com/graphql',
  credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const client = new ApolloClient({   
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false
  }),
  defaultOptions,
});

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>

}

export default MyApp
