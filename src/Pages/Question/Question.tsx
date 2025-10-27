import * as React from 'react';
import * as styles from './Question.module.css';
import { QuestionType } from '../../Types/types';

type Properties = {
  question: QuestionType;
};

const Question: React.FC<Properties> = ({ question }) => {
  return (
    <div>
      <div className={styles.question}>
        <div className={styles.questionInfo}>
          <div>title: {question.title}</div>
          <div>asked by: {question.user.username}</div>
        </div>
        <div className={styles.questionText}>
          description: {question.description}
        </div>
        <div>code: {question.attachedCode}</div>
      </div>
    </div>
  );
};

export default Question;
