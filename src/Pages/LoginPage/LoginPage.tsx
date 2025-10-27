import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { loginUserTC } from '../../Redux/authReducer';
import { useNavigate } from 'react-router-dom';
import * as styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isCredentialsCorrect = useAppSelector(
    (state) => state.auth.isCredentialsCorrect
  );

  const dispatch = useAppDispatch();

  const onNewUserClick = (): void => {
    navigate('/register');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(loginUserTC(username, password));
  };

  useEffect(() => {
    if (isCredentialsCorrect === true) {
      navigate('/');
    }
  }, [isCredentialsCorrect]);

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginCard} onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <input
          type="text"
          placeholder="Username"
          className={styles.loginInput}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.loginInput}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className={styles.loginButton}>
          Log in
        </button>
        <button className={styles.newUserButton} onClick={onNewUserClick}>
          I'm new user
        </button>
        <div className={styles.credentialsErrorMessage}>
          {!isCredentialsCorrect ? 'Wrong login or password' : null}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
