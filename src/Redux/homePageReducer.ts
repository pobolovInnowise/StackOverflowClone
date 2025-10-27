import Api from '../api/api.js';
import { SnippetType, CommentType, ActionType, MarkType } from '../Types/types';
import { AppDispatch, RootState } from './reduxStore';

const SET_SNIPPETS = 'SET_SNIPPETS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_SNIPPETS_COUNT = 'SET_TOTAL_SNIPPETS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_SELECTED_SNIPPET_ID = 'SET_SELECTED_SNIPPET_ID';
const SET_SELECTED_SNIPPET_COMMENTS = 'SET_SELECTED_SNIPPET_COMMENTS';
const SET_LANGUAGES_FROM_SERVER = 'SET_LANGUAGES_FROM_SERVER';

const api = new Api();

type State = {
  snippets: SnippetType[];
  pageSize: number;
  totalSnippetsCount: number | null;
  currentPage: number;
  isFetching: boolean;
  selectedSnippetId: number | null;
  selectedSnippetComments: Comment[];
  languages: string[];
};

const initialState: State = {
  snippets: [],
  pageSize: 3,
  totalSnippetsCount: null,
  currentPage: 1,
  isFetching: true,
  selectedSnippetId: null,
  selectedSnippetComments: [],
  languages: [],
};
const homePageReducer = (state: State = initialState, action: ActionType) => {
  if (action.type === SET_SNIPPETS)
    return { ...state, snippets: action.snippets };
  else if (action.type === SET_TOTAL_SNIPPETS_COUNT)
    return { ...state, totalSnippetsCount: action.totalSnippetsCount };
  else if (action.type === SET_IS_FETCHING)
    return { ...state, isFetching: action.isFetching };
  else if (action.type === SET_SELECTED_SNIPPET_ID)
    return { ...state, selectedSnippetId: action.id };
  else if (action.type === SET_SELECTED_SNIPPET_COMMENTS)
    return { ...state, selectedSnippetComments: [...action.comments] };
  else if (action.type === SET_CURRENT_PAGE)
    return { ...state, currentPage: action.currentPage };
  else if (action.type === SET_LANGUAGES_FROM_SERVER)
    return { ...state, languages: [...action.languages] };

  return state;
};

export const setSnippetsAC = (snippets: SnippetType[]) => {
  return {
    type: SET_SNIPPETS,
    snippets: snippets,
  };
};
export const setCurrentPageAC = (currentPage: number) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};
export const setTotalSnippetsCountAC = (totalSnippetsCount: number) => {
  return {
    type: SET_TOTAL_SNIPPETS_COUNT,
    totalSnippetsCount: totalSnippetsCount,
  };
};
export const setIsFetchingAC = (isFetching: boolean) => {
  return {
    type: SET_IS_FETCHING,
    isFetching: isFetching,
  };
};

export const setSelectedSnippetIdAC = (id: number) => {
  return {
    type: SET_SELECTED_SNIPPET_ID,
    id: id,
  };
};
export const setSelectedSnippetCommentsAC = (comments: Comment[]) => {
  return {
    type: SET_SELECTED_SNIPPET_COMMENTS,
    comments: comments,
  };
};

export const getSnippetsFromServerTC = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setIsFetchingAC(true));
    const state = getState();
    const response = await api.getSnippets(
      state.homePage.currentPage,
      state.homePage.pageSize
    );
    const snippetsFromServer = response.data.data.data;
    const totalItems = response.data.data.meta.totalItems;
    dispatch(setSnippetsAC(snippetsFromServer));
    dispatch(setTotalSnippetsCountAC(totalItems));
    dispatch(setIsFetchingAC(false));
  };
};

export const postCommentTC = (comment: string, id: number) => {
  return async () => {
    await api.postComment(comment, id);
  };
};

export const postSnippetTC = (selectedLanguage: string, code: string) => {
  return async () => {
    await api.postSnippet(selectedLanguage, code);
  };
};

export const getSnippetLanguagesTC = () => {
  return async (dispatch: AppDispatch) => {
    const response = await api.getSnippetLanguages();
    const languages = response.data.data;
    dispatch(setLanguagesFromServerAC(languages));
  };
};

export const setLanguagesFromServerAC = (languages: string[]) => {
  return {
    type: SET_LANGUAGES_FROM_SERVER,
    languages: languages,
  };
};

export const postMarkTC = (snippetId: number, mark: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    await api.postMarkForSnippet(snippetId, mark);
    const response = await api.getSnippets(
      state.homePage.currentPage,
      state.homePage.pageSize
    );
    const snippetsArray = response.data.data.data;
    const totalItems = response.data.data.meta.totalItems;
    dispatch(setSnippetsAC(snippetsArray));
    dispatch(setTotalSnippetsCountAC(totalItems));
  };
};

export default homePageReducer;
