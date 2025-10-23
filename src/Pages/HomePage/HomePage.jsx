import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  setSelectedSnippetIdAC,
  setCurrentPageAC, getSnippetsFromServerTC,
} from '../../Redux/homePageReducer.js';
import Snippet from '../Snippet/Snippet.jsx';
import { useNavigate } from 'react-router-dom';
// import * as styles from "./HomePage.module.css";
import Paginator from '../../Components/Paginator/Paginator.jsx';

const HomePage = (props) => {
  const navigate = useNavigate();

  const pagesCount = Math.ceil(props.totalSnippetsCount / props.pageSize);

  const onSnippetClick = (id) => {
    props.setSelectedSnippetId(id);
    navigate('/snippet-details');
  };

  const snippets = props.snippets.map((snippet) => (
    <div key={snippet.id}>
      <Snippet snippet={snippet} onCommentClick={onSnippetClick}></Snippet>
    </div>
  ));

  useEffect(() => {
    props.getSnippets();
  }, []);

  useEffect(() => {
    props.getSnippets();
  }, [props.currentPage]);

  return (
    <div>
      <div>
        <Paginator
          pagesCount={pagesCount}
          currentPage={props.currentPage}
          callback={(currentPage) => props.setCurrentPage(currentPage)}
        />
      </div>
      <div>{props.isFetching ? 'Loading, please wait...' : snippets}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    snippets: state.homePage.snippets,
    totalSnippetsCount: state.homePage.totalSnippetsCount,
    isFetching: state.homePage.isFetching,
    selectedSnippetId: state.homePage.selectedSnippetId,
    pageSize: state.homePage.pageSize,
    currentPage: state.homePage.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSnippets:(snippets)=> dispatch(getSnippetsFromServerTC(snippets)),

    setSelectedSnippetId: (id) => {
      dispatch(setSelectedSnippetIdAC(id));
    },
    setCurrentPage: (currentPage) => {
      dispatch(setCurrentPageAC(currentPage));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
