import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  getUserQuestionsTC,
  setSelectedQuestionIdAC,
} from '../../Redux/authReducer';
import { useEffect } from 'react';
import Question from '../Question/Question.js';
import { QuestionType } from '../../Types/types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const MyQuestions: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const myQuestions: QuestionType[] = useAppSelector(
    (state) => state.auth.myQuestions
  );
  const questions = myQuestions.map((question: QuestionType) => (
    <div key={question.id} onClick={() => onQuestionClick(question.id)}>
      {' '}
      <Question question={question} />{' '}
    </div>
  ));

  const onQuestionClick = (id: number) => {
    dispatch(setSelectedQuestionIdAC(id));
    navigate('/edit-question-page'); // editQP must read from state above mention id
  };

  useEffect((): void => {
    dispatch(getUserQuestionsTC());
  }, []);

  return (
    <div>
      My Questions
      <div>{questions}</div>
    </div>
  );
};

export default MyQuestions;
