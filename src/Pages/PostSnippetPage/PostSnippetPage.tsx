import * as React from 'react';
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as styles from './PostSnippetPage.module.css';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  getSnippetLanguagesTC,
  postSnippetTC,
} from '../../Redux/homePageReducer';

const PostSnippetPage: React.FC = () => {
  const languageMap = {
    JavaScript: 'javascript',
    Python: 'python',
    Java: 'java',
    Kotlin: 'kotlin',
    Ruby: 'ruby',
    'C/C++': 'cpp',
    'C#': 'csharp',
  };

  type LanguageMap = typeof languageMap;
  type LanguageKey = keyof LanguageMap;

  const [code, setCode] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageKey>('JavaScript');
  const [isSnippetPosted, setIsSnippetPosted] = useState<boolean>(false);

  const languages: string[] = useAppSelector(
    (state) => state.homePage.languages
  );
  const dispatch = useAppDispatch();

  const onCreateSnippetClick = () => {
    dispatch(postSnippetTC(selectedLanguage, code));
    setIsSnippetPosted(true);
  };

  useEffect(() => {
    dispatch(getSnippetLanguagesTC());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.currentTarget.value as LanguageKey);
  };

  return (
    <div>
      <div className={styles.block}>
        <p>Language of your snippet:</p>
        <select value={selectedLanguage} onChange={handleChange}>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.block}>
        <p>Code of your snippet:</p>
        <div className={styles.editorWrapper}>
          <Editor
            height="400px"
            language={languageMap[selectedLanguage] || 'plaintext'}
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

      <button onClick={onCreateSnippetClick}>Create snippet</button>
      <div className={styles.success}>
        {isSnippetPosted ? 'Snippet was created' : null}
      </div>
    </div>
  );
};

export default PostSnippetPage;
