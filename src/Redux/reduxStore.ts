import { applyMiddleware, combineReducers, createStore } from 'redux';
import userPageReducer from './userPageReducer';
import homePageReducer from './homePageReducer';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer';
import { thunk as thunkMiddleware } from 'redux-thunk';

const reducers = combineReducers({
  usersPage: userPageReducer,
  homePage: homePageReducer,
  auth: authReducer,
  questionsPage: questionsReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export type RootState = ReturnType<typeof reducers>;

// 🔹 Тип диспатча
export type AppDispatch = typeof store.dispatch;

export default store;
