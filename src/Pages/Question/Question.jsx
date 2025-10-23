import React from 'react';
import * as styles from './Question.module.css';
const Question = (props) => {
  return (
    <div>
      <div className={styles.question}>
        <div className={styles.questionInfo}>
          <div>title: {props.question.title}</div>
          <div>asked by: {props.question.user.username}</div>
        </div>
        <div className={styles.questionText}>
          description: {props.question.description}
        </div>
        <div>code: {props.question.attachedCode}</div>
      </div>
    </div>
  );
};

export default Question;
