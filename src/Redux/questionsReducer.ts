import api from '../api/api.js';
import { ActionType, AnswerType, QuestionType } from '../Types/types';
import { AppDispatch, RootState } from './reduxStore';

const SET_QUESTIONS = 'SET_QUESTIONS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_QUESTIONS_COUNT = 'SET_TOTAL_QUESTIONS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_SELECTED_QUESTION_ID = 'SET_SELECTED_QUESTION_ID';
const SET_SELECTED_QUESTION_ANSWERS = 'SET_SELECTED_QUESTION_ANSWERS';


type State = {
  questions: QuestionType[];
  pageSize: number;
  totalQuestionsCount: number | null;
  currentPage: number;
  isFetching: boolean;
  selectedQuestionId: number | null;
  selectedQuestionAnswers: AnswerType[];
};

const initialState: State = {
  questions: [],
  pageSize: 3,
  totalQuestionsCount: null,
  currentPage: 1,
  isFetching: true,
  selectedQuestionId: null,
  selectedQuestionAnswers: [],
};
const questionsReducer = (state: State = initialState, action: ActionType) => {
  if (action.type === SET_QUESTIONS)
    return { ...state, questions: action.payload };
  else if (action.type === SET_TOTAL_QUESTIONS_COUNT)
    return { ...state, totalQuestionsCount: action.payload };
  else if (action.type === SET_IS_FETCHING)
    return { ...state, isFetching: action.payload };
  else if (action.type === SET_SELECTED_QUESTION_ID)
    return { ...state, selectedQuestionId: action.payload };
  else if (action.type === SET_SELECTED_QUESTION_ANSWERS)
    return { ...state, selectedQuestionAnswers: [...action.payload] };
  else if (action.type === SET_CURRENT_PAGE)
    return { ...state, currentPage: action.payload };

  return state;
};

export const setQuestionsAC = (questions: QuestionType[]):ActionType => {
  return {
    type: SET_QUESTIONS,
    payload: questions,
  };
};
export const setCurrentPageAC = (currentPage: number):ActionType => {
  return {
    type: SET_CURRENT_PAGE,
    payload: currentPage,
  };
};
export const setTotalQuestionsCountAC = (totalQuestionsCount: number):ActionType => {
  return {
    type: SET_TOTAL_QUESTIONS_COUNT,
    payload: totalQuestionsCount,
  };
};
export const setIsFetchingAC = (isFetching: boolean):ActionType => {
  return {
    type: SET_IS_FETCHING,
    payload: isFetching,
  };
};

export const setSelectedQuestionIdAC = (id: number):ActionType => {
  return {
    type: SET_SELECTED_QUESTION_ID,
    payload: id,
  };
};

export const postQuestionTC = (
  title: string,
  description: string,
  code: string
) => {
  return async () => {
    await api.postQuestion(title, description, code);
  };
};

export const getQuestionsTC = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();

    dispatch(setIsFetchingAC(true));

    const response = await api.getQuestions(
      state.questionsPage.currentPage,
      state.questionsPage.pageSize
    );
    const questionsFromServer = response.data.data.data;
    const totalQuestionsCount = response.data.data.meta.totalItems;

    dispatch(setQuestionsAC(questionsFromServer));
    dispatch(setIsFetchingAC(false));
    dispatch(setTotalQuestionsCountAC(totalQuestionsCount));
  };
};

export default questionsReducer;
