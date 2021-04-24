import '../styles/index.scss';

import App from "next/app";
import { wrapper } from "../redux/wrapper";

import { getCurrentUser } from '../redux/actions';

class WrappedApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    // Keep in mind that this will be called twice on server, one for page and second for error page
    
    const response = await ctx.store.dispatch(getCurrentUser(ctx));
    let currentUser = {};
    if(response?.data?.currentUser){
      currentUser = response.data.currentUser;
    }
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        appProp: ctx.pathname,
        currentUser,
      },
      props: {
        currentUser,
      }
    };
  };

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(WrappedApp);