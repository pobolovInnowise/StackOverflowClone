import React from 'react';
import * as styles from './Snippet.module.css';
import { connect } from 'react-redux';
import Api from '../../Api/api.js';
import {
  setSnippetsAC,
  setTotalSnippetsCountAC,
} from '../../Redux/homePageReducer.js';
import like from '../../assets/like-icon.png';
import dislike from '../../assets/dislike-icon.png';
import commentsIcon from '../../assets/comments-icon.png';
const Snippet = (props) => {
  const api = new Api();

  const likes = props.snippet.marks.filter(
    (mark) => mark.type === 'like'
  ).length;
  const dislikes = props.snippet.marks.filter(
    (mark) => mark.type === 'dislike'
  ).length;
  const comments = props.snippet.comments.length;

  const onLikeButtonClick = async (e) => {
    e.stopPropagation();

    try {
      await api.postMarkForSnippet(props.snippet.id, 'like');
      const response = await api.getSnippets(props.currentPage, props.pageSize);
      const snippetsArray = response.data.data.data;
      const totalItems = response.data.data.meta.totalItems;
      props.setSnippets(snippetsArray);
      props.setTotalSnippetsCount(totalItems);
    } catch {
      console.log('Like/Dislike error');
    }
  };

  const onDislikeButtonClick = async (e) => {
    e.stopPropagation();
    try {
      await api.postMarkForSnippet(props.snippet.id, 'dislike');
      const response = await api.getSnippets(props.currentPage, props.pageSize);
      const snippetsArray = response.data.data.data;
      const totalItems = response.data.data.meta.totalItems;
      props.setSnippets(snippetsArray);
      props.setTotalSnippetsCount(totalItems);
    } catch {
      console.log('Like/Dislike error');
    }
  };

  return (
    <div className={styles.snippet}>
      <div className={styles.header}>
        <span>{props.snippet.user.username}</span>
        <span>{props.snippet.language}</span>
      </div>
      <div className={styles.main}>{props.snippet.code}</div>
      <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
        <div>
          <button
            onClick={onLikeButtonClick}
            disabled={props.isLoggedIn ? false : true}
          >
            <img src={like} alt="like" />
          </button>
          <span>{likes}</span>
          <button
            onClick={onDislikeButtonClick}
            disabled={props.isLoggedIn ? false : true}
          >
            <img src={dislike} alt="dislike" />
          </button>
          <span>{dislikes}</span>
        </div>
        <div>
          <button
            onClick={() => props.onCommentClick(props.snippet.id)}
            disabled={props.isLoggedIn ? false : true}
          >
            <img src={commentsIcon} alt="commentsIcon" />
          </button>
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    pageSize: state.homePage.pageSize,
    currentPage: state.homePage.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSnippets: (snippets) => dispatch(setSnippetsAC(snippets)),
    setTotalSnippetsCount: (totalSnippetsCount) =>
      dispatch(setTotalSnippetsCountAC(totalSnippetsCount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Snippet);
