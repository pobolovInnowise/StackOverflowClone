import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setQuestionsAC,
  setTotalQuestionsCountAC,
  setIsFetchingAC,
  setCurrentPageAC,
  setSelectedQuestionIdAC,
} from '../../Redux/questionsReducer.js';
import Question from '../Question/Question.jsx';
import Api from '../../Api/api.js';
import Paginator from '../../Components/Paginator/Paginator.jsx';
import * as styles from './QuestionsPage.module.css';
import { useNavigate } from 'react-router-dom';

const QuestionsPage = (props) => {
  const navigate = useNavigate();

  const api = new Api();

  const onAskQuestionClick = () => {
    navigate('/ask-question');
  };

  const pagesCount = Math.ceil(props.totalQuestionsCount / props.pageSize);

  useEffect(() => {
    const getData = async () => {
      const response = await api.getQuestions(
        props.currentPage,
        props.pageSize
      );
      const questionsFromServer = response.data.data.data;
      const totalQuestionsCount = response.data.data.meta.totalItems;

      props.setQuestions(questionsFromServer);
      props.setIsFetching(false);
      props.setTotalQuestionsCount(totalQuestionsCount);
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      props.setIsFetching(true);
      const response = await api.getQuestions(
        props.currentPage,
        props.pageSize
      );
      props.setIsFetching(false);
      const questionsFromServer = response.data.data.data;
      props.setQuestions(questionsFromServer);
    };
    getData();
  }, [props.currentPage]);

  const questions = props.questions.map((question) => (
    <div key={question.id}>
      <Question question={question}></Question>
    </div>
  ));

  return (
    <div>
      <Paginator
        pagesCount={pagesCount}
        currentPage={props.currentPage}
        callback={(currentPage) => props.setCurrentPage(currentPage)}
      />
      <button
        onClick={onAskQuestionClick}
        disabled={props.isLoggedIn ? false : true}
        className={styles.askButton}
      >
        Ask Question
      </button>

      {props.isFetching ? (
        <div className={styles.loading}>Loading, please wait...</div>
      ) : (
        questions
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    questions: state.questionsPage.questions,
    totalQuestionsCount: state.questionsPage.totalQuestionsCount,
    isFetching: state.questionsPage.isFetching,
    selectedQuestionId: state.questionsPage.selectedQuestionId,
    pageSize: state.questionsPage.pageSize,
    currentPage: state.questionsPage.currentPage,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setQuestions: (questions) => dispatch(setQuestionsAC(questions)),
    setTotalQuestionsCount: (totalSnippetsCount) => {
      dispatch(setTotalQuestionsCountAC(totalSnippetsCount));
    },
    setIsFetching: (isFetching) => {
      dispatch(setIsFetchingAC(isFetching));
    },
    setSelectedQuestionId: (id) => {
      dispatch(setSelectedQuestionIdAC(id));
    },
    setCurrentPage: (currentPage) => {
      dispatch(setCurrentPageAC(currentPage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
