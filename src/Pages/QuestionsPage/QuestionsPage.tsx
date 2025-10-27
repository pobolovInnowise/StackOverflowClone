import * as React from 'react';
import { JSX, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setCurrentPageAC, getQuestionsTC } from '../../Redux/questionsReducer';
import Question from '../Question/Question';
import Paginator from '../../Components/Paginator/Paginator';
import * as styles from './QuestionsPage.module.css';
import { useNavigate } from 'react-router-dom';
import { QuestionType } from '../../Types/types';

const QuestionsPage: React.FC = () => {
  const navigate = useNavigate();

  const onAskQuestionClick = () => {
    navigate('/ask-question');
  };

  const dispatch = useAppDispatch();

  const questions: QuestionType[] = useAppSelector(
    (state) => state.questionsPage.questions
  );
  const totalQuestionsCount: number = useAppSelector(
    (state) => state.questionsPage.totalQuestionsCount
  );
  const isFetching: boolean = useAppSelector(
    (state) => state.questionsPage.isFetching
  );
  const pageSize: number = useAppSelector(
    (state) => state.questionsPage.pageSize
  );
  const currentPage: number = useAppSelector(
    (state) => state.questionsPage.currentPage
  );
  const isLoggedIn: boolean = useAppSelector((state) => state.auth.isLoggedIn);

  const pagesCount: number = Math.ceil(totalQuestionsCount / pageSize);

  useEffect(() => {
    dispatch(getQuestionsTC());
  }, []);

  useEffect(() => {
    dispatch(getQuestionsTC());
  }, [currentPage]);

  const questionsElements: JSX.Element[] = questions.map((question) => (
    <div key={question.id}>
      <Question question={question}></Question>
    </div>
  ));

  return (
    <div>
      <Paginator
        pagesCount={pagesCount}
        currentPage={currentPage}
        callback={(currentPage) => dispatch(setCurrentPageAC(currentPage))}
      />
      <button
        onClick={onAskQuestionClick}
        disabled={isLoggedIn ? false : true}
        className={styles.askButton}
      >
        Ask Question
      </button>

      {isFetching ? <div>Loading, please wait...</div> : questionsElements}
    </div>
  );
};

export default QuestionsPage;
