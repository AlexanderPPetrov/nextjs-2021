import '../styles/index.scss';
import { ApolloProvider } from '@apollo/client/react';
import { getClient } from "../apollo-client";
import { GET_CURRENT_USER } from "../queries/user";

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={getClient()}>
      <Component {...pageProps} />
  </ApolloProvider>
}

export default MyApp

MyApp.getInitialProps = async ctx => {
    const data = await getClient(ctx).query({
       query: GET_CURRENT_USER,
    });
    return {
      props: {},
    }
}