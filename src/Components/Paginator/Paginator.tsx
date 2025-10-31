import { useState } from 'react';
import styles from './Paginator.module.css';

type Properties = {
  currentPage: number;
  pagesCount: number;
  callback: (value: number) => void;
};

const Paginator = ({
  currentPage,
  pagesCount,
  callback,
}:Properties) => {
  const [currentPageForPaginator, setCurrentPageForPaginator] =
    useState(currentPage);

  const onButtonWithArrowsClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    let newCurrentPage: number = 0;
    if (e.currentTarget.textContent === '<<') {
      newCurrentPage =
        currentPageForPaginator - 10 <= 0
          ? currentPageForPaginator
          : currentPageForPaginator - 10;
    } else if (e.currentTarget.textContent === '<') {
      newCurrentPage =
        currentPageForPaginator - 1 === 0
          ? currentPageForPaginator
          : currentPageForPaginator - 1;
    } else if (e.currentTarget.textContent === '>') {
      newCurrentPage =
        currentPage + 1 > pagesCount ? currentPage : currentPage + 1;
    } else if (e.currentTarget.textContent === '>>') {
      newCurrentPage =
        currentPage + 10 > pagesCount ? currentPage : currentPage + 10;
    }
    setCurrentPageForPaginator(newCurrentPage);
    callback(newCurrentPage);
  };

  const onPageNumberClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const page: number = Number(e.currentTarget.textContent);
    setCurrentPageForPaginator(page);
    callback(page);
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
        className={`${styles.sideNumber} ${currentPage === pagesCount ? styles.currentPage : ''}`}
      >
        {pagesCount}
      </button>
    </div>
  );
};

export default Paginator;
