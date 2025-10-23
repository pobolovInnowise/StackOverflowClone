import React from 'react';
import * as styles from './Snippet.module.css';
import Api from '../../Api/api.js';
import {
  setSnippetsAC,
  setTotalSnippetsCountAC,
} from '../../Redux/homePageReducer.js';
import like from '../../assets/like-icon.png';
import dislike from '../../assets/dislike-icon.png';
import commentsIcon from '../../assets/comments-icon.png';
import { useSelector, useDispatch } from 'react-redux';

const Snippet = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const pageSize = useSelector((state) => state.homePage.pageSize);
  const currentPage = useSelector((state) => state.homePage.currentPage);

  const dispatch = useDispatch();

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
      const response = await api.getSnippets(currentPage, pageSize);
      const snippetsArray = response.data.data.data;
      const totalItems = response.data.data.meta.totalItems;
      dispatch(setSnippetsAC(snippetsArray));
      dispatch(setTotalSnippetsCountAC(totalItems));
    } catch {
      console.log('Like/Dislike error');
    }
  };

  const onDislikeButtonClick = async (e) => {
    e.stopPropagation();
    try {
      await api.postMarkForSnippet(props.snippet.id, 'dislike');
      const response = await api.getSnippets(currentPage, pageSize);
      const snippetsArray = response.data.data.data;
      const totalItems = response.data.data.meta.totalItems;
      dispatch(setSnippetsAC(snippetsArray));
      dispatch(setTotalSnippetsCountAC(totalItems));
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
            disabled={isLoggedIn ? false : true}
          >
            <img src={like} alt="like" />
          </button>
          <span>{likes}</span>
          <button
            onClick={onDislikeButtonClick}
            disabled={isLoggedIn ? false : true}
          >
            <img src={dislike} alt="dislike" />
          </button>
          <span>{dislikes}</span>
        </div>
        <div>
          <button
            onClick={() => props.onCommentClick(props.snippet.id)}
            disabled={isLoggedIn ? false : true}
          >
            <img src={commentsIcon} alt="commentsIcon" />
          </button>
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default Snippet;
