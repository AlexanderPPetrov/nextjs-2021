import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cookieCutter from 'cookie-cutter'

const httpLink = createHttpLink({
    // uri: 'https://graphql-api-2021.herokuapp.com/graphql',
    uri: "http://localhost:3001/graphql",
    credentials: 'same-origin'
});
  
const authLink = setContext((_, { headers }) => {
// check if it's a browser or SSR
let token = process.browser ?  cookieCutter.get("token") : ""

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

export default client