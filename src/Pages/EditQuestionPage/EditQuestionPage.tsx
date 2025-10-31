import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import styles from './EditQuestionPage.module.css';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { QuestionType } from '../../Types/types';
import { useNavigate } from 'react-router-dom';
import { changeQuestionTC } from '../../Redux/authReducer';

const EditQuestionPage: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const selectedQuestionId: number = useAppSelector(
    (state) => state.auth.selectedQuestionId
  );
  const myQuestions: QuestionType[] = useAppSelector(
    (state) => state.auth.myQuestions
  );
  const selectedQuestion: QuestionType = myQuestions.filter(
    (q) => q.id === selectedQuestionId
  )[0];

  const [title, setTitle] = useState(selectedQuestion.title);
  const [description, setDescription] = useState(selectedQuestion.description);
  const [code, setCode] = useState(selectedQuestion.attachedCode);
  const [isQuestionEdited, setIsQuestionEdited] = useState(false);

  const onEditQuestionClick = async (): Promise<void> => {
    try {
      await dispatch(changeQuestionTC(title, description, code));
      navigate('/my-questions');
      setIsQuestionEdited(true);
      setTitle('');
      setDescription('');
      setCode('');
    } catch (error) {
      console.error('Error editing question:', error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.page}>
      <h2>Edit Question</h2>

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

      <button className={styles.button} onClick={onEditQuestionClick}>
        Edit Question
      </button>

      {isQuestionEdited && (
        <div className={styles.success}>
          Your question was successfully edited!
        </div>
      )}
    </div>
  );
};

export default EditQuestionPage;
