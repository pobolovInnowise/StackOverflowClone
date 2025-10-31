import styles from './Question.module.css';
import { QuestionType } from '../../Types/types';

type Properties = {
  question: QuestionType;
};

const Question = ({ question }: Properties) => {
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
