import api from '../api/api.js';
import { ActionType, SnippetType, QuestionType } from '../Types/types';
import { AppDispatch, RootState } from './reduxStore';

const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';
const SET_LOGGED_IN_USER_NAME = 'SET_LOGGED_IN_USER_NAME';
const SET_LOGGED_IN_ID = 'SET_LOGGED_IN_ID';
const SET_LOGGED_IN_ROLE = 'SET_LOGGED_IN_ROLE';
const EMPTYING_STATE = 'EMPTYING_STATE';
const SET_IS_CREDENTIALS_CORRECT = 'SET_IS_CREDENTIALS_CORRECT';

const SET_MY_SNIPPETS = 'SET_MY_SNIPPETS';
const CLEAR_MY_SNIPPETS = 'CLEAR_MY_SNIPPETS';
const SET_SNIPPET_TO_EDIT = 'SET_SNIPPET_TO_EDIT';

const SET_MY_QUESTIONS = 'SET_MY_QUESTIONS';
const CLEAR_MY_QUESTIONS = 'CLEAR_MY_QUESTIONS';
const SET_SELECTED_QUESTION_ID = 'SET_SELECTED_QUESTION_ID';


type State = {
  isLoggedIn: boolean;
  loggedInUsername: string;
  loggedInId: number | null;
  loggedInRole: string;
  isCredentialsCorrect: boolean | number;
  mySnippets: SnippetType[];
  snippetToEdit: SnippetType | null;
  myQuestions: QuestionType[];
  selectedQuestionId: number | null;
};

const initialState: State = {
  isLoggedIn: false,
  loggedInUsername: '',
  loggedInId: null,
  loggedInRole: '',
  isCredentialsCorrect: 1,
  mySnippets: [],
  snippetToEdit: null,
  myQuestions: [],
  selectedQuestionId: null,
};
const authReducer = (state: State = initialState, action: ActionType) => {
  if (action.type === SET_IS_LOGGED_IN)
    return { ...state, isLoggedIn: action.payload };
  else if (action.type === SET_LOGGED_IN_USER_NAME)
    return { ...state, loggedInUsername: action.payload };
  else if (action.type === SET_LOGGED_IN_ROLE)
    return { ...state, loggedInRole: action.payload };
  else if (action.type === SET_LOGGED_IN_ID)
    return { ...state, loggedInId: action.payload };
  else if (action.type === EMPTYING_STATE)
    return {
      ...state,
      isLoggedIn: false,
      loggedInUsername: '',
      loggedInId: null,
      loggedInRole: '',
      isCredentialsCorrect: 1,
    };
  else if (action.type === SET_IS_CREDENTIALS_CORRECT)
    return { ...state, isCredentialsCorrect: action.payload };
  else if (action.type === SET_MY_SNIPPETS)
    return { ...state, mySnippets: [...action.payload] };
  else if (action.type === CLEAR_MY_SNIPPETS)
    return { ...state, mySnippets: [] };
  else if (action.type === SET_SNIPPET_TO_EDIT)
    return { ...state, snippetToEdit: action.payload };
  else if (action.type === SET_MY_QUESTIONS)
    return { ...state, myQuestions: [...action.payload] };
  else if (action.type === SET_SELECTED_QUESTION_ID)
    return { ...state, selectedQuestionId: action.payload };

  return state;
};

export const setIsLoggedInAC = (status: boolean):ActionType => {
  return {
    type: SET_IS_LOGGED_IN,
    payload: status,
  };
};

export const setLoggedInUsernameInAC = (username: string):ActionType => {
  return {
    type: SET_LOGGED_IN_USER_NAME,
    payload: username,
  };
};

export const setLoggedInIdAC = (id: number):ActionType  => {
  return {
    type: SET_LOGGED_IN_ID,
    payload: id,
  };
};

export const setLoggedInRoleAC = (role: string):ActionType => {
  return {
    type: SET_LOGGED_IN_ROLE,
    payload: role,
  };
};

export const changeUsernameTC = (newUsername: string) => {
  return async (dispatch: AppDispatch) => {
    const response = await api.changeUsername(newUsername);
    dispatch(setLoggedInUsernameInAC(response.data.data.username));
  };
};

export const changePasswordTC = (oldPassword: string, newPassword: string) => {
  return async () => {
    await api.changePassword(oldPassword, newPassword);
  };
};

export const loginUserTC = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await api.loginUser(username, password);

      dispatch(setLoggedInUsernameInAC(response.data.data.username));
      dispatch(setLoggedInIdAC(response.data.data.id));
      dispatch(setLoggedInRoleAC(response.data.data.role));
      dispatch(setIsLoggedInAC(true));
      dispatch(setIsCredentialsCorrectAC(true));

    } catch (error) {
      dispatch(setIsCredentialsCorrectAC(false));
      console.error('Login error:', error);
    }
  };
};


export const checkActiveSessionTC = () => {
  return async (dispatch: AppDispatch) => {
    const response = await api.getMe();
    console.log(response.data.data)
    if(response.status === 200){
      dispatch(setLoggedInUsernameInAC(response.data.data.username));
      dispatch(setLoggedInIdAC(response.data.data.id));
      dispatch(setLoggedInRoleAC(response.data.data.role));
      dispatch(setIsLoggedInAC(true));
      dispatch(setIsCredentialsCorrectAC(true));
    }

  };
};


export const registerUserTC = (username: string, password: string) => {
  return async () => {
    await api.registerUser(username, password);
  };
};

export const emptyingStateAC = ():ActionType  => {
  return {
    type: EMPTYING_STATE,
  };
};

export const logoutUserTC = () => {
  return async (dispatch: AppDispatch) => {
    const response = await api.logoutUser();
    if (response.statusText === 'OK') {
      dispatch(emptyingStateAC());
      dispatch(clearMySnippetsAC());
      dispatch(setIsCredentialsCorrectAC(1));
    }
  };
};

export const setIsCredentialsCorrectAC = (value: boolean | number):ActionType  => {
  return {
    type: SET_IS_CREDENTIALS_CORRECT,
    payload: value,
  };
};

export const deleteAccountTC = () => {
  return async (dispatch: AppDispatch) => {
     await api.deleteAccount();
    dispatch(emptyingStateAC());
    dispatch(clearMySnippetsAC());
  };
};

export const setMySnippetsAC = (mySnippets: SnippetType[]):ActionType  => {
  return {
    type: SET_MY_SNIPPETS,
    payload: mySnippets,
  };
};

export const clearMySnippetsAC = ():ActionType  => {
  return {
    type: CLEAR_MY_SNIPPETS,
  };
};

export const getUserSnippetsTC = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const response = await api.getSnippetsByUserId(state.auth.loggedInId);
    const snippets = response.data.data.data;
    dispatch(setMySnippetsAC(snippets));
  };
};

export const getUserQuestionsTC = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const myQuestions = await api.getQuestionsByUserId(state.auth.loggedInId);
    dispatch(setMyQuestionsAC(myQuestions));
  };
};

export const setMyQuestionsAC = (questions: QuestionType[]):ActionType  => {
  return {
    type: SET_MY_QUESTIONS,
    payload: questions,
  };
};

export const setSnippetToEditAC = (snippet: SnippetType):ActionType  => {
  return {
    type: SET_SNIPPET_TO_EDIT,
    payload: snippet,
  };
};

export const changeSnippetTC = (
  language: string,
  code: string,
  snippetId: number
) => {
  return async (dispatch: AppDispatch) => {
    await api.changeSnippet(language, code, snippetId);
    dispatch(getUserSnippetsTC());
  };
};

export const setSelectedQuestionIdAC = (selectedQuestionId: number):ActionType  => {
  return {
    type: SET_SELECTED_QUESTION_ID,
    payload: selectedQuestionId,
  };
};

export const changeQuestionTC = (
  title: string,
  description: string,
  code: string
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
     await api.changeQuestion(
      title,
      description,
      code,
      state.auth.selectedQuestionId
    );
    dispatch(getUserQuestionsTC());
  };
};



export default authReducer;
