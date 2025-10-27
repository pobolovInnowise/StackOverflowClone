import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import Snippet from '../Snippet/Snippet.js';
import * as styles from './PostPage.module.css';
import {
  getSnippetsFromServerTC,
  postCommentTC,
} from '../../Redux/homePageReducer';
import { CommentType, SnippetType } from '../../Types/types';

const PostPage: React.FC = () => {
  const [comment, setComment] = useState('');
  const dispatch = useAppDispatch();
  const selectedSnippetId = useAppSelector(
    (state) => state.homePage.selectedSnippetId
  );
  const snippets = useAppSelector((state) => state.homePage.snippets);

  const onInputCommentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setComment(e.currentTarget.value);
  };

  const snippet = snippets.filter(
    (snippet: SnippetType): boolean => snippet.id === selectedSnippetId
  )[0];
  const comments = snippet.comments.map((comment: CommentType) => (
    <div className={styles.comment} key={comment.id}>
      {comment.content}
    </div>
  ));
  const onSendCommandButtonClick = (): void => {
    dispatch(postCommentTC(comment, snippet.id));
    setComment('');
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getSnippetsFromServerTC());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.postPage}>
      <div className={styles.snippetWrapper}>
        <Snippet snippet={snippet} onCommentClick={() => {}} />
      </div>

      <div className={styles.commentsSection}>
        <div className={styles.commentsTitle}>
          Comments related to the snippet:
        </div>
        <div className={styles.commentsList}>{comments}</div>
      </div>

      <div className={styles.commentInputSection}>
        <input
          className={styles.commentInput}
          placeholder="Your comment..."
          value={comment}
          onChange={onInputCommentChange}
        />
        <button
          className={styles.commentButton}
          onClick={onSendCommandButtonClick}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default PostPage;
