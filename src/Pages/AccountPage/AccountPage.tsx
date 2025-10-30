import { useEffect, useState } from 'react';
import userIcon from '../../assets/user-icon.png';
import * as styles from './AccountPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';

import {
  changePasswordTC,
  changeUsernameTC,
  deleteAccountTC,
} from '../../Redux/authReducer';
import UserProfilePage from '../UserProfilePage/UserProfilePage.js';
import { getUserProfileTC } from '../../Redux/userPageReducer';

const AccountPage = () => {
  const navigate = useNavigate();

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isConfirmedPasswordWrong, setConfirmedPasswordWrong] = useState(false);
  const [isNewNameCorrect, setIsNewNameCorrect] = useState(false);
  const [isNewPasswordCorrect, setIsNewPasswordCorrect] = useState(false);

  const loggedInId: number = useAppSelector((state) => state.auth.loggedInId);
  const loggedInUsername: string = useAppSelector(
    (state) => state.auth.loggedInUsername
  );
  const loggedInRole: string = useAppSelector(
    (state) => state.auth.loggedInRole
  );

  const dispatch = useAppDispatch();


  const regExp: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

  const handleNewUserName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewUsername(e.currentTarget.value);
    if (e.currentTarget.value.length >= 5) {
      setIsNewNameCorrect(true);
    } else {
      setIsNewNameCorrect(false);
    }
  };
  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.currentTarget.value);
    if (regExp.test(e.currentTarget.value)) {
      setIsNewPasswordCorrect(true);
    } else {
      setIsNewPasswordCorrect(false);
    }
  };
  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOldPassword(e.currentTarget.value);
  };
  const handleConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmPassword(e.currentTarget.value);
  };

  const handleChangeUsername = async (): Promise<void> => {
    await dispatch(changeUsernameTC(newUsername));
    setNewUsername('');
    setIsNewNameCorrect(true);
  };

  const handleChangePassword = async (): Promise<void> => {
    if (newPassword === confirmPassword) {
      await dispatch(changePasswordTC(oldPassword, newPassword));
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
    dispatch(getUserProfileTC(loggedInId));
  }, []);

  const onDeleteAccountCLick = () => {
    dispatch(deleteAccountTC());
    navigate('/');
  };

  return (
    <div className={styles.accountPage}>
      <div>Welcome, {loggedInUsername}</div>
      <div className={styles.account}>
        <div className={styles.accountHeader}>
          <img src={userIcon as string} alt="userIcon" />
          <div className={styles.accountMainInfo}>
            <p>Username: {loggedInUsername}</p>
            <p>Id: {loggedInId}</p>
            <p>Role: {loggedInRole}</p>
          </div>
          <button
            className={styles.deleteAccountButton}
            onClick={onDeleteAccountCLick}
          >
            delete account
          </button>
        </div>

        <div className={styles.accountStatistics}>
          <UserProfilePage />
        </div>
        <div>
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
                className={!isNewNameCorrect ? styles.disabled : undefined}
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
                className={!isNewPasswordCorrect ? styles.disabled : undefined}
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

export default AccountPage;
