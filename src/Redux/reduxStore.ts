import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userPageReducer from './userPageReducer';
import homePageReducer from './homePageReducer';
import authReducer from './authReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  usersPage: userPageReducer,
  homePage: homePageReducer,
  auth: authReducer,
  questionsPage: questionsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;