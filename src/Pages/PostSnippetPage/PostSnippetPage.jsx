import React, { useEffect, useState } from 'react';
import Api from '../../Api/api.js';
import Editor from '@monaco-editor/react';
import * as styles from './PostSnippetPage.module.css';

const PostSnippetPage = () => {
  const api = new Api();
  const languageMap = {
    JavaScript: 'javascript',
    Python: 'python',
    Java: 'java',
    Kotlin: 'kotlin',
    Ruby: 'ruby',
    'C/C++': 'cpp',
    'C#': 'csharp',
  };

  const [code, setCode] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isSnippetPosted, setIsSnippetPosted] = useState(false);

  const onCreateSnippetClick = async () => {
    await api.postSnippet(selectedLanguage, code);
    setIsSnippetPosted(true);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await api.getSnippetLanguages();
      setLanguages(response.data.data);
    };

    getData();
  }, []);

  const handleChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className={styles.page}>
      <div className={styles.block}>
        <p>Language of your snippet:</p>
        <select value={selectedLanguage} onChange={handleChange}>
          <option value="">Select language</option>
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
