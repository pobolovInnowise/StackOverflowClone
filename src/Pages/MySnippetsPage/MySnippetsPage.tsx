import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { getUserSnippetsTC, setSnippetToEditAC } from '../../Redux/authReducer';
import Snippet from '../Snippet/Snippet.js';
import styles from './MySnippetsPage.module.css';
import { useNavigate } from 'react-router-dom';
import { SnippetType } from '../../Types/types';

const MySnippetsPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const mySnippets: SnippetType[] = useAppSelector(
    (state) => state.auth.mySnippets
  );

  const onSnippetClick = (snippet: SnippetType): void => {
    dispatch(setSnippetToEditAC(snippet));
    navigate('/edit-snippet');
  };

  useEffect(() => {
    dispatch(getUserSnippetsTC());
  }, []);

  if (mySnippets.length === 0)
    return <div className={styles.mySnipets}>No snippets yet</div>;

  return (
    <div className={styles.mySnipets}>
      {mySnippets.map((snippet) => (
        <div key={snippet.id} onClick={() => onSnippetClick(snippet)}>
          <Snippet
            key={snippet.id}
            snippet={snippet}
            onCommentClick={() => {}}
          ></Snippet>
        </div>
      ))}
    </div>
  );
};

export default MySnippetsPage;
