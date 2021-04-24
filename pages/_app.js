import '../styles/index.scss';
import { ApolloProvider } from '@apollo/client/react';
import { getClient } from "../apollo-client";
import { GET_CURRENT_USER } from "../queries/user";
import Cookies from "cookies"

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={getClient()}>
      <Component {...pageProps} />
  </ApolloProvider>
}

export default MyApp

MyApp.getInitialProps = async ctx => {
    let currentUser = {};
    try {
      currentUser = await getClient(ctx).query({
        query: GET_CURRENT_USER,
      });
    } catch (e) {
      const cookies = new Cookies(ctx.ctx.req, ctx.ctx.res)
      cookies.set("token", "", { expires: new Date(0) })
    }
    return {
      props: {
        currentUser,
      },
    }
}