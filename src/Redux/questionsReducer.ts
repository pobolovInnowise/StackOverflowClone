import Api from '../api/api.js';
import { ActionType, AnswerType, QuestionType } from '../Types/types';
import { AppDispatch, RootState } from './reduxStore';

const SET_QUESTIONS = 'SET_QUESTIONS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_QUESTIONS_COUNT = 'SET_TOTAL_QUESTIONS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_SELECTED_QUESTION_ID = 'SET_SELECTED_QUESTION_ID';
const SET_SELECTED_QUESTION_ANSWERS = 'SET_SELECTED_QUESTION_ANSWERS';

const api = new Api();

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

export const setQuestionsAC = (questions: QuestionType[]) => {
  return {
    type: SET_QUESTIONS,
    questions: questions,
  };
};
export const setCurrentPageAC = (currentPage: number) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage,
  };
};
export const setTotalQuestionsCountAC = (totalQuestionsCount: number) => {
  return {
    type: SET_TOTAL_QUESTIONS_COUNT,
    totalQuestionsCount: totalQuestionsCount,
  };
};
export const setIsFetchingAC = (isFetching: boolean) => {
  return {
    type: SET_IS_FETCHING,
    isFetching: isFetching,
  };
};

export const setSelectedQuestionIdAC = (id: number) => {
  return {
    type: SET_SELECTED_QUESTION_ID,
    id: id,
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
