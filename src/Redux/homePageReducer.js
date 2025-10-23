import Api from "../Api/api.js";

const SET_SNIPPETS = 'SET_SNIPPETS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_SNIPPETS_COUNT = 'SET_TOTAL_SNIPPETS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_SELECTED_SNIPPET_ID = 'SET_SELECTED_SNIPPET_ID';
const SET_SELECTED_SNIPPET_COMMENTS = 'SET_SELECTED_SNIPPET_COMMENTS';

const api = new Api();

const initialState = {
  snippets: [],
  pageSize: 3,
  totalSnippetsCount: null,
  currentPage: 1,
  isFetching: true,
  selectedSnippetId: null,
  selectedSnippetComments: [],
};
const homePageReducer = (state = initialState, action) => {
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

  return state;
};

export const setSnippetsAC = (snippets) => {
  return {
    type: SET_SNIPPETS,
    snippets: snippets,
  };
};
export const setCurrentPageAC = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};
export const setTotalSnippetsCountAC = (totalSnippetsCount) => {
  return {
    type: SET_TOTAL_SNIPPETS_COUNT,
    totalSnippetsCount: totalSnippetsCount,
  };
};
export const setIsFetchingAC = (isFetching) => {
  return {
    type: SET_IS_FETCHING,
    isFetching: isFetching,
  };
};

export const setSelectedSnippetIdAC = (id) => {
  return {
    type: SET_SELECTED_SNIPPET_ID,
    id: id,
  };
};
export const setSelectedSnippetCommentsAC = (comments) => {
  return {
    type: SET_SELECTED_SNIPPET_COMMENTS,
    comments: comments,
  };
};

export const getSnippetsFromServerTC = () => {
  return async (dispatch, getState)=>{

    dispatch(setIsFetchingAC(true));
    const state = getState();
    const response = await api.getSnippets(state.homePage.currentPage, state.homePage.pageSize);
    const snippetsFromServer = response.data.data.data;
    const totalItems = response.data.data.meta.totalItems;
    dispatch(setSnippetsAC(snippetsFromServer));
    dispatch(setTotalSnippetsCountAC(totalItems));
    dispatch(setIsFetchingAC(false));
  }
}

export const postCommentTC = (comment,id) => {
  return async () => {
    await api.postComment(comment, id);
  }
}


export default homePageReducer;
