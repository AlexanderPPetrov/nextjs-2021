import '../styles/index.scss';
import { ApolloProvider } from '@apollo/client/react';
import client from "../apollo-client";
import { GET_CURRENT_USER } from "../queries/user";
import Cookies from 'cookies'

function MyApp({ Component, pageProps }) {
  return <ApolloProvider client={client}>
      <Component {...pageProps} />
  </ApolloProvider>
}

export default MyApp

MyApp.getInitialProps = async ctx => {
    const cookies = new Cookies(ctx.ctx.req, ctx.ctx.res)
    const token = cookies.get("token");
    const data = await client.query({
       query: GET_CURRENT_USER,
       headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
    console.log(data);
    return {
      props: {},
    }
}