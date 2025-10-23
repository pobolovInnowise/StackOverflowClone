import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getUserProfileTC,
  getUsersTC,
  setCurrentPageAC,
  setIsFetchingAC,
} from '../../Redux/userPageReducer.js';
import { useNavigate } from 'react-router-dom';
import User from './User.jsx';
import styles from './UsersPage.module.css';
import Paginator from '../../Components/Paginator/Paginator.jsx';

const UsersPage = (props) => {
  const navigate = useNavigate();

  const onUserClickHandler = (userId) => {
    props.setSelectedUserProfile(userId);
    navigate('/profile');
  };

  const users = props.users.map((user) => (
    <User key={user.id} user={user} onClick={onUserClickHandler} />
  ));

  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  useEffect(() => {
    props.setUsers();
    props.setIsFetching(false);
  }, []);

  useEffect(() => {
    props.setIsFetching(true);
    props.setUsers();
    props.setIsFetching(false);
  }, [props.currentPage]);

  return (
    <div className={styles.usersPage}>
      <div className={styles.paginatorWrapper}>
        <Paginator
          pagesCount={pagesCount}
          currentPage={props.currentPage}
          callback={(currentPage) => props.setCurrentPage(currentPage)}
        />
      </div>

      <div className={styles.usersList}>
        {props.isFetching ? (
          <div className={styles.loading}>Loading, please wait...</div>
        ) : (
          users
        )}
      </div>
    </div>
  );
};

//     pagesCount: ...,
//     currentPage: ...,
//     callback: ()=>{}

const mapStateToProps = (state) => ({
  users: state.usersPage.users,
  isFetching: state.usersPage.isFetching,
  pageSize: state.usersPage.pageSize,
  totalUsersCount: state.usersPage.totalUsersCount,
  currentPage: state.usersPage.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  setUsers: (users) => dispatch(getUsersTC(users)),

  setIsFetching: (isFetching) => dispatch(setIsFetchingAC(isFetching)),
  setCurrentPage: (currentPage) => dispatch(setCurrentPageAC(currentPage)),
  setSelectedUserProfile: (selectedUserId) =>
    dispatch(getUserProfileTC(selectedUserId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
