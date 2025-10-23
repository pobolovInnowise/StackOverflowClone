import { useState } from 'react';
import * as styles from './Paginator.module.css';

const Paginator = (props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  const onButtonWithArrowsClick = (e) => {
    let newCurrentPage = null;
    if (e.target.textContent === '<<') {
      newCurrentPage = currentPage - 10 <= 0 ? currentPage : currentPage - 10;
    } else if (e.target.textContent === '<') {
      newCurrentPage = currentPage - 1 === 0 ? currentPage : currentPage - 1;
    } else if (e.target.textContent === '>') {
      newCurrentPage =
        currentPage + 1 > props.pagesCount ? currentPage : currentPage + 1;
    } else if (e.target.textContent === '>>') {
      newCurrentPage =
        currentPage + 10 > props.pagesCount ? currentPage : currentPage + 10;
    }
    setCurrentPage(newCurrentPage);
    props.callback(newCurrentPage);
  };

  const onPageNumberClick = (e) => {
    setCurrentPage(+e.target.textContent);
    props.callback(+e.target.textContent);
  };

  return (
    <div className={styles.paginator}>
      <button
        onClick={onPageNumberClick}
        className={`${styles.sideNumber} ${currentPage === 1 ? styles.currentPage : ''}`}
      >
        1
      </button>

      <button onClick={onButtonWithArrowsClick} className={styles.arrow}>
        {'<<'}
      </button>
      <button onClick={onButtonWithArrowsClick} className={styles.arrow}>
        {'<'}
      </button>

      <button onClick={onPageNumberClick} className={styles.currentPage}>
        {currentPage}
      </button>

      <button onClick={onButtonWithArrowsClick} className={styles.arrow}>
        {'>'}
      </button>
      <button onClick={onButtonWithArrowsClick} className={styles.arrow}>
        {'>>'}
      </button>

      <button
        onClick={onPageNumberClick}
        className={`${styles.sideNumber} ${currentPage === props.pagesCount ? styles.currentPage : ''}`}
      >
        {props.pagesCount}
      </button>
    </div>
  );
};

export default Paginator;

// props
// {
//     pagesCount: ...,
//     currentPage: ...,
//     callback: ()=>{}
// }
