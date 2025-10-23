import Api from '../Api/api.js';

const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_SELECTED_USER_PROFILE = 'SET_SELECTED_USER_PROFILE';

const api = new Api();

const initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: null,
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
const usersPageReducer = (state = initialState, action) => {
  if (action.type === SET_USERS) return { ...state, users: [...action.users] };
  else if (action.type === SET_CURRENT_PAGE)
    return { ...state, currentPage: action.currentPage };
  else if (action.type === SET_TOTAL_USERS_COUNT)
    return { ...state, totalUsersCount: action.totalUsersCount };
  else if (action.type === SET_IS_FETCHING)
    return { ...state, isFetching: action.isFetching };
  else if (action.type === SET_SELECTED_USER_PROFILE)
    return { ...state, selectedUserProfile: action.selectedUserProfile };
  return state;
};

export const setUsersAC = (users) => {
  return {
    type: SET_USERS,
    users: users,
  };
};
export const setCurrentPageAC = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};
export const setTotalUsersCountAC = (totalUsersCount) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount: totalUsersCount,
  };
};
export const setIsFetchingAC = (isFetching) => {
  return {
    type: SET_IS_FETCHING,
    isFetching: isFetching,
  };
};

export const setSelectedUserProfileAC = (selectedUserProfile) => {
  return {
    type: SET_SELECTED_USER_PROFILE,
    selectedUserProfile: selectedUserProfile,
  };
};

export const getUsersTC = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await api.getUsers(
      state.usersPage.currentPage,
      state.usersPage.pageSize
    );
    const usersFromServer = response.data.data.data;
    const totalUsersCount = response.data.data.meta.totalItems;

    dispatch(setUsersAC(usersFromServer));
    dispatch(setTotalUsersCountAC(totalUsersCount));
  };
};

export const getUserProfileTC = (userId) => {
  return async (dispatch) => {
    const response = await api.getUserProfile(userId);
    const profile = response.data.data;
    dispatch(setSelectedUserProfileAC(profile));
  };
};

export default usersPageReducer;
