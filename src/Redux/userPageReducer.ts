import api from '../api/api.js';
import { ActionType, UserType, UserProfileType } from '../Types/types';
import { AppDispatch, RootState } from './reduxStore';

const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_SELECTED_USER_PROFILE = 'SET_SELECTED_USER_PROFILE';


type State = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  selectedUserProfile: UserProfileType;
};

const initialState: State = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  selectedUserProfile: {
    id: null,
    username: null,
    role: null,
    statistic: {
      snippetsCount: null,
      rating: null,
      commentsCount: null,
      likesCount: null,
      dislikesCount: null,
      questionsCount: null,
      correctAnswersCount: null,
      regularAnswersCount: null,
    },
  },
};
const usersPageReducer = (
  state: State = initialState,
  action: ActionType
): State => {
  if (action.type === SET_USERS) return { ...state, users: [...action.payload] };
  else if (action.type === SET_CURRENT_PAGE)
    return { ...state, currentPage: action.payload };
  else if (action.type === SET_TOTAL_USERS_COUNT)
    return { ...state, totalUsersCount: action.payload };
  else if (action.type === SET_IS_FETCHING)
    return { ...state, isFetching: action.payload };
  else if (action.type === SET_SELECTED_USER_PROFILE)
    return { ...state, selectedUserProfile: action.payload };
  return state;
};

export const setUsersAC = (users: UserType[]): ActionType => {
  return {
    type: SET_USERS,
    payload: users,
  };
};
export const setCurrentPageAC = (currentPage: number): ActionType => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage,
  };
};
export const setTotalUsersCountAC = (totalUsersCount: number): ActionType => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    payload: totalUsersCount,
  };
};
export const setIsFetchingAC = (isFetching: boolean): ActionType => {
  return {
    type: SET_IS_FETCHING,
    payload: isFetching,
  };
};

export const setSelectedUserProfileAC = (selectedUserProfile: UserProfileType): ActionType => {
  return {
    type: SET_SELECTED_USER_PROFILE,
    payload: selectedUserProfile,
  };
};

export const getUsersTC = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    dispatch(setIsFetchingAC(true));
    const response = await api.getUsers(
      state.usersPage.currentPage,
      state.usersPage.pageSize
    );
    const usersFromServer = response.data.data.data;
    const totalUsersCount = response.data.data.meta.totalItems;

    dispatch(setUsersAC(usersFromServer));
    dispatch(setTotalUsersCountAC(totalUsersCount));
    dispatch(setIsFetchingAC(false));
  };
};

export const getUserProfileTC = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    const response = await api.getUserProfile(userId);
    const profile = response.data.data;
    dispatch(setSelectedUserProfileAC(profile));
  };
};

export default usersPageReducer;
