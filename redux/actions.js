import actions from './action-types';
import { GET_GAMES } from "../queries/games";
import { GET_CURRENT_USER } from "../queries/user";
import { getClient } from "../apollo-client";
import { LOGIN, LOGOUT } from '../mutations/auth';
import cookieCutter from "cookie-cutter";
import Cookies from "cookies";
import moment from "moment";


export function setGames(games){
    return {type: actions.SET_GAMES, payload: games};
}
export function setCurrenUser(user){
    return {type: actions.SET_CURRENT_USER, payload: user};
}
export const getGames = params => async dispatch => {
    try {
        const response = await getClient().query({
            query: GET_GAMES,
        });
        if(response?.data?.games){
            dispatch(setGames(response.data.games));
        }
    } catch (error) {
        console.log(error)
    }
}
export const getCurrentUser = (ctx) => async dispatch => {
    try {
        const response = await getClient(ctx).query({
            query: GET_CURRENT_USER,
        });
        if(response?.data?.currentUser){
            dispatch(setCurrenUser(response.data.currentUser));
        }
        return response;
    } catch (error) {
        if(process.browser) {
            cookieCutter.set('token', '', { expires: new Date(0) })
        }else{
            const cookies = new Cookies(ctx.req, ctx.res);
            cookies.set("token", "", { expires: new Date(0) })
        }
        console.log(error)
    }
}

export const login = variables => async dispatch => {
    try {
        const response = await getClient().mutate({
            mutation: LOGIN,
            variables,
        });
        if(response?.data?.login){
            const token = response.data.login;
            cookieCutter.set(
                "token", 
                token, 
                { expires: new moment().add(1, "d")._d 
            })
            dispatch(getCurrentUser());
        }
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => async dispatch => {
    try {
        const response = await getClient().mutate({
            mutation: LOGOUT,
        });
        if(response?.data?.logout){
            cookieCutter.set('token', '', { expires: new Date(0) })
            dispatch(setCurrenUser({}));
        }
        return response;
    } catch (error) {
        console.log(error)
    }
}
