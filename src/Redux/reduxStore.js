import { applyMiddleware, combineReducers, createStore } from 'redux';
import userPageReducer from './userPageReducer.js';
import homePageReducer from './homePageReducer.js';
import authReducer from './authReducer.js';
import mySnippetsPageReducer from './mySnippetsPageReducer.js';
import questionsReducer from './questionsReducer.js';
import { thunk as thunkMiddleware } from 'redux-thunk';

const reducers = combineReducers({
  usersPage: userPageReducer,
  homePage: homePageReducer,
  auth: authReducer,
  snippetsPage: mySnippetsPageReducer,
  questionsPage: questionsReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
