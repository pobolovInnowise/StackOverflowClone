import styles from './Snippet.module.css';
import { postMarkTC } from '../../Redux/homePageReducer';
import like from '../../assets/like-icon.png';
import dislike from '../../assets/dislike-icon.png';
import commentsIcon from '../../assets/comments-icon.png';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { SnippetType } from '../../Types/types';

type Properties = {
  snippet: SnippetType;
  onCommentClick: (id: number) => void;
};
const Snippet = ({ snippet, onCommentClick }: Properties) => {
  const isLoggedIn: boolean = useAppSelector((state) => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  const likes: number = snippet.marks.filter(
    (mark) => mark.type === 'like'
  ).length;
  const dislikes: number = snippet.marks.filter(
    (mark) => mark.type === 'dislike'
  ).length;
  const comments: number = snippet.comments.length;

  const onLikeButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(postMarkTC(snippet.id, 'like'));
  };

  const onDislikeButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    dispatch(postMarkTC(snippet.id, 'dislike'));
  };

  return (
    <div className={styles.snippet}>
      <div className={styles.header}>
        <span>{snippet.user.username}</span>
        <span>{snippet.language}</span>
      </div>
      <div className={styles.main}>{snippet.code}</div>
      <div className={styles.footer} onClick={(e) => e.stopPropagation()}>
        <div>
          <button onClick={onLikeButtonClick} disabled={!isLoggedIn}>
            <img src={like as string} alt="like" />
          </button>
          <span>{likes}</span>
          <button onClick={onDislikeButtonClick} disabled={!isLoggedIn}>
            <img src={dislike as string} alt="dislike" />
          </button>
          <span>{dislikes}</span>
        </div>
        <div>
          <button
            onClick={() => onCommentClick(snippet.id)}
            disabled={!isLoggedIn}
          >
            <img src={commentsIcon as string} alt="commentsIcon" />
          </button>
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default Snippet;
