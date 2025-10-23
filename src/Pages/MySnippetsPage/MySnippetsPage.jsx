import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserSnippetsTC} from '../../Redux/mySnippetsPageReducer.js';
import Snippet from '../Snippet/Snippet.jsx';
import styles from './MySnippetsPage.module.css';


const MySnippetsPage = (props) => {

  const dispatch= useDispatch();
  const mySnippets = useSelector((state) => state.snippetsPage.mySnippets);

  useEffect(() => {

    dispatch(getUserSnippetsTC())
  }, []);

  const onSnippetClick = (id) => {};

  return (
    <div className={styles.mySnipets}>
      {mySnippets.map((snippet) => (
        <Snippet
          key={snippet.id}
          snippet={snippet}
          onCommentClick={onSnippetClick}
        ></Snippet>
      ))}
    </div>
  );
};


export default MySnippetsPage;
