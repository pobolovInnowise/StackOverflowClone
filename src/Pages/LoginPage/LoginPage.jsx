import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {
  loginUserTC,
} from '../../Redux/authReducer.js';
import { useNavigate } from 'react-router-dom';
import * as styles from './LoginPage.module.css';

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUserTC(username, password));
    navigate('/home');
  };

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
      </form>
    </div>
  );
};


export default LoginPage;
