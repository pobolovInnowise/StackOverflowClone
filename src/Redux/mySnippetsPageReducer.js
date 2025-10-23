import Api from "../Api/api.js";

const SET_MY_SNIPPETS = 'SET_MY_SNIPPETS';
const CLEAR_MY_SNIPPETS = 'CLEAR_MY_SNIPPETS';

const api = new Api();

const initialState = {
  mySnippets: [],
};
const mySnippetsPageReducer = (state = initialState, action) => {
  if (action.type === SET_MY_SNIPPETS)
    return { ...state, mySnippets: [...action.mySnippets] };
  else if (action.type === CLEAR_MY_SNIPPETS)
    return { ...state, mySnippets: [] };

  return state;
};

export const setMySnippetsAC = (mySnippets) => {
  return {
    type: SET_MY_SNIPPETS,
    mySnippets: mySnippets,
  };
};

export const clearMySnippetsAC = () => {
  return {
    type: CLEAR_MY_SNIPPETS,
  };
};

export const getUserSnippetsTC = () => {
  return async (dispatch, getState)=>{
    const state = getState();
    const response = await api.getSnippetsByUserId(state.auth.loggedInId);
    const snippets = response.data.data.data;
    dispatch(setMySnippetsAC(snippets));
  }
}



export default mySnippetsPageReducer;
