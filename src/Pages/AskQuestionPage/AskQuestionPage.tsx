import * as React from 'react';
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import * as styles from './AskQuestionPage.module.css';
import { useAppDispatch } from '../../Redux/hooks';
import { postQuestionTC } from '../../Redux/questionsReducer';

const AskQuestionPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [isQuestionPosted, setIsQuestionPosted] = useState(false);

  const onCreateQuestionClick = async (): Promise<void> => {
    try {
      await dispatch(postQuestionTC(title, description, code));
      setIsQuestionPosted(true);
      setTitle('');
      setDescription('');
      setCode('');
    } catch (error) {
      console.error('Error posting question:', error);
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
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </div>

      <div className={styles.block}>
        <p>Question description:</p>
        <textarea
          placeholder="Describe your question..."
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
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
