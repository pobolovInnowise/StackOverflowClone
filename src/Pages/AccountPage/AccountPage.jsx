import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import userIcon from '../../assets/user-icon.png';
import * as styles from './AccountPage.module.css';

import {
  changePasswordTC,
  changeUsernameTC,
  setLoggedInStatisticTC,
} from '../../Redux/authReducer.js';

const AccountPage = (props) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isConfirmedPasswordWrong, setConfirmedPasswordWrong] = useState(false);
  const [isNewNameCorrect, setIsNewNameCorrect] = useState(false);
  const [isNewPasswordCorrect, setIsNewPasswordCorrect] = useState(false);

  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

  const handleNewUserName = (e) => {
    setNewUsername(e.target.value);
    if (e.target.value.length >= 5) {
      setIsNewNameCorrect(true);
    } else {
      setIsNewNameCorrect(false);
    }
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
    if (regExp.test(e.target.value)) {
      setIsNewPasswordCorrect(true);
    } else {
      setIsNewPasswordCorrect(false);
    }
  };
  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangeUsername = () => {
    props.setLoggedInUsername(newUsername);

    setNewUsername('');
    setIsNewNameCorrect(true);
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      props.changePassword(oldPassword, newPassword);
      setNewPassword('');
      setOldPassword('');
      setConfirmPassword('');
      setIsPasswordChanged(true);
      setConfirmedPasswordWrong(false);
      setIsNewPasswordCorrect(true);
    } else {
      setConfirmedPasswordWrong(true);
    }
  };

  useEffect(() => {
    props.setLoggedInStatistic();
  }, [props.loggedInId]);

  return (
    <div className={styles.accountPage}>
      <div>Welcome, {props.loggedInUsername}</div>
      <div className={styles.account}>
        <div className={styles.accountHeader}>
          <img src={userIcon} alt="userIcon" />
          <div className={styles.accountMainInfo}>
            <p>Username: {props.loggedInUsername}</p>
            <p>Id: {props.loggedInId}</p>
            <p>Role: {props.loggedInRole}</p>
          </div>
        </div>

        <div className={styles.accountStatistics}>
          <h3>Statistics</h3>
          <p>Snippets: {props.loggedInStatistic.snippetsCount}</p>
          <p>Rating: {props.loggedInStatistic.rating}</p>
          <p>Comments: {props.loggedInStatistic.commentsCount}</p>
          <p>Likes: {props.loggedInStatistic.likesCount}</p>
          <p>Dislikes: {props.loggedInStatistic.dislikesCount}</p>
          <p>Questions: {props.loggedInStatistic.questionsCount}</p>
          <p>Correct Answers: {props.loggedInStatistic.correctAnswersCount}</p>
          <p>Regular Answers: {props.loggedInStatistic.regularAnswersCount}</p>
        </div>
        <div className={styles.changeInfo}>
          <div className={styles.changeInfoText}>Edit your profile</div>
          <div className={styles.changeInfoContent}>
            <div className={styles.changeInfoContentUsername}>
              <div>
                <b>Change your name</b>
              </div>
              <div>
                <i>Name should be at least 5 symbols long</i>
              </div>
              <input
                className={isNewNameCorrect ? styles.success : styles.error}
                type="text"
                placeholder={'New username'}
                value={newUsername}
                onChange={handleNewUserName}
              ></input>
              <button
                onClick={handleChangeUsername}
                className={!isNewNameCorrect ? styles.disabled : null}
              >
                Change username
              </button>
            </div>
            <div className={styles.changeInfoContentPassword}>
              <div>
                <b>Change your password</b>
              </div>
              <div>
                <i>
                  Password must contain at least one lowercase letter, one
                  uppercase letter, one number, one symbol and be at least 6
                  symbols long!
                </i>
              </div>
              <input
                type="password"
                placeholder={'Old password'}
                value={oldPassword}
                onChange={handleOldPassword}
              ></input>
              <input
                type="password"
                placeholder={'New password'}
                value={newPassword}
                onChange={handleNewPassword}
                className={isNewPasswordCorrect ? styles.success : styles.error}
              ></input>
              <input
                type="password"
                placeholder={'Confirm password'}
                value={confirmPassword}
                onChange={handleConfirmPassword}
              ></input>
              <button
                onClick={handleChangePassword}
                className={!isNewPasswordCorrect ? styles.disabled : null}
              >
                Change password
              </button>
              {isPasswordChanged ? (
                <p className={styles.successMessage}>
                  Password successfully changed
                </p>
              ) : null}
              {isConfirmedPasswordWrong ? (
                <p className={styles.errorMessage}>Passwords are not same</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInId: state.auth.loggedInId,
    loggedInUsername: state.auth.loggedInUsername,
    loggedInRole: state.auth.loggedInRole,
    loggedInStatistic: state.auth.loggedInStatistic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedInStatistic: () => {
      dispatch(setLoggedInStatisticTC());
    },
    setLoggedInUsername: (username) => {
      dispatch(changeUsernameTC(username));
    },
    changePassword: (oldPassword, newPassword) => {
      dispatch(changePasswordTC(oldPassword, newPassword));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
