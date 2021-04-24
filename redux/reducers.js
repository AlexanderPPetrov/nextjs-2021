import actions from './action-types';
import {combineReducers} from 'redux';

function games(state = [], action) {
    switch(action.type) {
        case actions.SET_GAMES: {
            return [...action.payload]
        }
        default:
            return state;
    }
}
function currentUser(state = {}, action) {
    console.log(action)
    switch(action.type) {
        case actions.SET_CURRENT_USER: {
            return {...action.payload}
        }
        default:
            return state;
    }
}

export default combineReducers({games, currentUser});