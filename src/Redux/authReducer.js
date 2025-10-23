import Api from '../Api/api.js';

const SET_SNIPPETS = 'SET_SNIPPETS';
const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
const SET_LOGGED_IN_USER_NAME = 'SET_LOGGED_IN_USER_NAME';
const SET_LOGGED_IN_ID = 'SET_LOGGED_IN_ID';
const SET_LOGGED_IN_ROLE = 'SET_LOGGED_IN_ROLE';
const SET_LOGGED_IN_STATISTIC = 'SET_LOGGED_IN_STATISTIC';

const api = new Api();

const initialState = {
  isLoggedIn: false,
  loggedInUsername: '',
  loggedInId: null,
  loggedInRole: '',
  loggedInStatistic: {
    snippetsCount: null,
    rating: null,
    commentsCount: null,
    likesCount: null,
    dislikesCount: null,
    questionsCount: null,
    correctAnswersCount: null,
    regularAnswersCount: null,
  },
};
const authReducer = (state = initialState, action) => {
  if (action.type === SET_IS_LOGGED_IN)
    return { ...state, isLoggedIn: action.status };
  else if (action.type === SET_LOGGED_IN_USER_NAME)
    return { ...state, loggedInUsername: action.username };
  else if (action.type === SET_LOGGED_IN_ROLE)
    return { ...state, loggedInRole: action.role };
  else if (action.type === SET_LOGGED_IN_ID)
    return { ...state, loggedInId: action.id };
  else if (action.type === SET_LOGGED_IN_STATISTIC)
    return { ...state, loggedInStatistic: action.statistic };

  return state;
};

export const setIsLoggedInAC = (status) => {
  return {
    type: SET_IS_LOGGED_IN,
    status: status,
  };
};

export const setLoggedInUsernameInAC = (username) => {
  return {
    type: SET_LOGGED_IN_USER_NAME,
    username: username,
  };
};

export const setLoggedInIdAC = (id) => {
  return {
    type: SET_LOGGED_IN_ID,
    id: id,
  };
};

export const setLoggedInRoleAC = (role) => {
  return {
    type: SET_LOGGED_IN_ROLE,
    role: role,
  };
};

export const setLoggedInStatisticAC = (statistic) => {
  return {
    type: SET_LOGGED_IN_STATISTIC,
    statistic: statistic,
  };
};

export const setLoggedInStatisticTC = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const response = await api.getUserProfile(state.auth.loggedInId);
    const profile = response.data.data;
    dispatch(setLoggedInStatisticAC(profile.statistic));
  };
};

export const changeUsernameTC = (newUsername) => {
  return async (dispatch) => {
    const response = await api.changeUsername(newUsername);
    dispatch(setLoggedInUsernameInAC(response.data.data.username));
  };
};

export const changePasswordTC = (oldPassword, newPassword) => {
  return async () => {
    await api.changePassword(oldPassword, newPassword);
  };
};

export const loginUserTC = (username,password) => {
  return async (dispatch, getState) => {
    const response = await api.loginUser(username, password);
    dispatch(setLoggedInUsernameInAC(response.data.data.username));
    dispatch(setLoggedInIdAC(response.data.data.id));
    dispatch(setLoggedInRoleAC(response.data.data.role));
    dispatch(setIsLoggedInAC(true));
  }
}


export default authReducer;
