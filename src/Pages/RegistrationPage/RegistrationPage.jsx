import React, { useState } from 'react';
import Api from '../../Api/api.js';
import * as styles from './RegistrationPage.module.css';
import { useNavigate } from 'react-router-dom';

let api = new Api();
const RegistrationPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.registerUser(username, password);
    navigate('/login');
  };
  return (
    <div className={styles.signUpContainer}>
      <form className={styles.signUpCard} onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <input
          type="text"
          placeholder="Username"
          className={styles.signUpInput}
          onChange={handleInputUsername}
          value={username}
        />
        <input
          type="text"
          placeholder="Password"
          className={styles.signUpInput}
          onChange={handleInputPassword}
          value={password}
        />
        <button type="submit" className={styles.signUpButton}>
          Sign up
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
