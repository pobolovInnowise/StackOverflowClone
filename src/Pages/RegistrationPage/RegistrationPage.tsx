import * as React from 'react';
import { useState } from 'react';
import * as styles from './RegistrationPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { registerUserTC } from '../../Redux/authReducer';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const onExistingAccountClick = () => {
    navigate('/login');
  };

  const handleInputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUserTC(username, password));
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
        <button
          className={styles.existingAccountButton}
          onClick={onExistingAccountClick}
        >
          I already have account
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
