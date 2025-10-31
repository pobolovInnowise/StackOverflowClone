import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import styles from './EditSnippetPage.module.css';
import { getSnippetLanguagesTC } from '../../Redux/homePageReducer';
import { changeSnippetTC } from '../../Redux/authReducer';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { SnippetType } from '../../Types/types';

const EditSnippetPage = () => {
  const snippetToEdit: SnippetType = useAppSelector(
    (state) => state.auth.snippetToEdit
  );

  const [code, setCode] = useState<string>(snippetToEdit.code);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    snippetToEdit.language
  );
  const [isSnippetPosted, setIsSnippetPosted] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onEditSnippetClick = async (): Promise<void> => {
    await dispatch(changeSnippetTC(selectedLanguage, code, snippetToEdit.id));
    setIsSnippetPosted(true);
  };

  useEffect(() => {
    dispatch(getSnippetLanguagesTC());
  }, []);

  return (
    <div>
      <div className={styles.block}>
        <p>Language of your snippet:</p>
        <p>{snippetToEdit.language}</p>
      </div>

      <div className={styles.block}>
        <p>Code of your snippet:</p>
        <div className={styles.editorWrapper}>
          <Editor
            height="400px"
            language={snippetToEdit.language}
            value={snippetToEdit.code}
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

      <button onClick={onEditSnippetClick}>Edit snippet</button>
      <div className={styles.success}>
        {isSnippetPosted ? 'Snippet was edited' : null}
      </div>
    </div>
  );
};

export default EditSnippetPage;
