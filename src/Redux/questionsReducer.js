import Api from "../Api/api.js";

const SET_QUESTIONS = 'SET_QUESTIONS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_QUESTIONS_COUNT = 'SET_TOTAL_QUESTIONS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_SELECTED_QUESTION_ID = 'SET_SELECTED_QUESTION_ID';
const SET_SELECTED_QUESTION_ANSWERS = 'SET_SELECTED_QUESTION_ANSWERS';

const api = new Api();

const initialState = {
  questions: [],
  pageSize: 3,
  totalQuestionsCount: null,
  currentPage: 1,
  isFetching: true,
  selectedQuestionId: null,
  selectedQuestionAnswers: [],
};
const questionsReducer = (state = initialState, action) => {
  if (action.type === SET_QUESTIONS)
    return { ...state, questions: action.questions };
  else if (action.type === SET_TOTAL_QUESTIONS_COUNT)
    return { ...state, totalQuestionsCount: action.totalQuestionsCount };
  else if (action.type === SET_IS_FETCHING)
    return { ...state, isFetching: action.isFetching };
  else if (action.type === SET_SELECTED_QUESTION_ID)
    return { ...state, selectedQuestionId: action.id };
  else if (action.type === SET_SELECTED_QUESTION_ANSWERS)
    return { ...state, selectedQuestionAnswers: [...action.answers] };
  else if (action.type === SET_CURRENT_PAGE)
    return { ...state, currentPage: action.currentPage };

  return state;
};

export const setQuestionsAC = (questions) => {
  return {
    type: SET_QUESTIONS,
    questions: questions,
  };
};
export const setCurrentPageAC = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};
export const setTotalQuestionsCountAC = (totalQuestionsCount) => {
  return {
    type: SET_TOTAL_QUESTIONS_COUNT,
    totalQuestionsCount: totalQuestionsCount,
  };
};
export const setIsFetchingAC = (isFetching) => {
  return {
    type: SET_IS_FETCHING,
    isFetching: isFetching,
  };
};

export const setSelectedQuestionIdAC = (id) => {
  return {
    type: SET_SELECTED_QUESTION_ID,
    id: id,
  };
};

export const postQuestionTC = (title, description, code) =>{
  return async (dispatch, getState)=>{
    await api.postQuestion(title, description, code);
  }
}

export default questionsReducer;










