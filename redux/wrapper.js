import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { createWrapper, Context } from "next-redux-wrapper";
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export const makeStore = (context) =>
  createStore(rootReducer, applyMiddleware(thunk));

export const wrapper = createWrapper(makeStore);