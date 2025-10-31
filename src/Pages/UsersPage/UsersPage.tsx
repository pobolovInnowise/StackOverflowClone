import * as React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import {
  getUserProfileTC,
  getUsersTC,
  setCurrentPageAC,
} from '../../Redux/userPageReducer';
import { useNavigate } from 'react-router-dom';
import User from './User';
import * as styles from './UsersPage.module.css';
import Paginator from '../../Components/Paginator/Paginator';
import { UserType } from '../../Types/types';

const UsersPage = () => {
  const navigate = useNavigate();

  const users: UserType[] = useAppSelector((state) => state.usersPage.users);
  const isFetching: boolean = useAppSelector(
    (state) => state.usersPage.isFetching
  );
  const pageSize: number = useAppSelector((state) => state.usersPage.pageSize);
  const totalUsersCount: number | null = useAppSelector(
    (state) => state.usersPage.totalUsersCount
  );
  const currentPage: number = useAppSelector(
    (state) => state.usersPage.currentPage
  );

  const dispatch = useAppDispatch();

  const onUserClickHandler = (userId: number): void => {
    dispatch(getUserProfileTC(userId));
    navigate('/profile');
  };

  const usersElements = users.map((user: UserType) => (
    <User key={user.id} user={user} onClick={onUserClickHandler} />
  ));

  const pagesCount: number = Math.ceil(totalUsersCount / pageSize);

  useEffect((): void => {
    dispatch(getUsersTC());
  }, [currentPage]);


  return (
    <div className={styles.usersPage}>
      <div className={styles.paginatorWrapper}>
        <Paginator
          pagesCount={pagesCount}
          currentPage={currentPage}
          callback={(currentPage: number) =>
            dispatch(setCurrentPageAC(currentPage))
          }
        />
      </div>

      <div className={styles.usersList}>
        {isFetching ? (
          <div className={styles.loading}>Loading, please wait...</div>
        ) : (
          usersElements
        )}
      </div>
    </div>
  );
};

export default UsersPage;
