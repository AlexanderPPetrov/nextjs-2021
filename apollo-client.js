import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cookieCutter from 'cookie-cutter'
import Cookies from "cookies"

let globalClient = null;

export const getClient = (ctx) => {
    if(process.browser){
        if(!globalClient){
            globalClient = createClient();
        }
        return globalClient
    }
    return createClient(ctx);
}

const createClient = (ctx) => {
    const httpLink = createHttpLink({
        uri: process.env.API_URL,
        credentials: 'same-origin'
    });
      
    const authLink = setContext((_, { headers }) => {
    // check if it's a browser or SSR
    let token = process.browser ?  cookieCutter.get("token") : ""
    if(ctx){
        // When there is ctx it's the SSR
        const cookies = new Cookies(ctx.ctx.req, ctx.ctx.res)
        token = cookies.get("token");
    }
    console.log("-------->", token);
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
            errorPolicy: 'ignore',
        },
    }
      
    const client = new ApolloClient({   
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
            addTypename: false
        }),
        defaultOptions,
    });

    return client
}
