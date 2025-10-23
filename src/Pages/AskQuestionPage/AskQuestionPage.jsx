import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import * as styles from './AskQuestionPage.module.css';
import {useDispatch} from "react-redux";
import {postQuestionTC} from "../../Redux/questionsReducer.js";

const AskQuestionPage = () => {

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [isQuestionPosted, setIsQuestionPosted] = useState(false);

  const onCreateQuestionClick = () => {
    try {
      dispatch(postQuestionTC(title, description, code));
      setIsQuestionPosted(true);
      setTitle('');
      setDescription('');
      setCode('');
    } catch (err) {
      console.error('Error posting question:', err);
    }
  };

  return (
    <div className={styles.page}>
      <h2>Ask Question</h2>

      <div className={styles.block}>
        <p>Question title:</p>
        <input
          type="text"
          placeholder="Enter question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.block}>
        <p>Question description:</p>
        <textarea
          placeholder="Describe your question..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.block}>
        <p>Attach your code (optional):</p>
        <div className={styles.editorWrapper}>
          <Editor
            height="300px"
            language="javascript"
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      <button className={styles.button} onClick={onCreateQuestionClick}>
        Create Question
      </button>

      {isQuestionPosted && (
        <div className={styles.success}>
          Your question was successfully created!
        </div>
      )}
    </div>
  );
};

export default AskQuestionPage;



let a = 0 && 2
