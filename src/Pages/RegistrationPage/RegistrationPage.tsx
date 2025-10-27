// import * as React from 'react';
// import { useState } from 'react';
// import * as styles from './RegistrationPage.module.css';
// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from '../../Redux/hooks';
// import { registerUserTC } from '../../Redux/authReducer';
//
// const RegistrationPage: React.FC = () => {
//   const navigate = useNavigate();
//
//   const [username, setUsername] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//
//   const dispatch = useAppDispatch();
//
//   const onExistingAccountClick = () => {
//     navigate('/login');
//   };
//
//   const handleInputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(e.currentTarget.value);
//   };
//   const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.currentTarget.value);
//   };
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     dispatch(registerUserTC(username, password));
//     navigate('/login');
//   };
//   return (
//     <div className={styles.signUpContainer}>
//       <form className={styles.signUpCard} onSubmit={handleSubmit}>
//         <h2>Sign up</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           className={styles.signUpInput}
//           onChange={handleInputUsername}
//           value={username}
//         />
//         <input
//           type="text"
//           placeholder="Password"
//           className={styles.signUpInput}
//           onChange={handleInputPassword}
//           value={password}
//         />
//         <button type="submit" className={styles.signUpButton}>
//           Sign up
//         </button>
//         <button
//           className={styles.existingAccountButton}
//           onClick={onExistingAccountClick}
//         >
//           I already have account
//         </button>
//       </form>
//     </div>
//   );
// };
//
// export default RegistrationPage;

import * as React from 'react';
import { useState } from 'react';
import * as styles from './RegistrationPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { registerUserTC } from '../../Redux/authReducer';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isNewPasswordCorrect, setIsNewPasswordCorrect] = useState<boolean>(false);
  const [isConfirmedPasswordWrong, setConfirmedPasswordWrong] = useState<boolean>(false);


  const regExp: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

  const handleInputUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.currentTarget.value);
    if (regExp.test(e.currentTarget.value)) {
      setIsNewPasswordCorrect(true);
    } else {
      setIsNewPasswordCorrect(false);
    }
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // из AccountPage
    if (newPassword === confirmPassword) {
      dispatch(registerUserTC(username, newPassword));
      navigate('/login');
      setConfirmedPasswordWrong(false);
    } else {
      setConfirmedPasswordWrong(true);
    }
  };

  const onExistingAccountClick = () => {
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
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={handleNewPassword}
          className={`${styles.signUpInput} ${
            newPassword ? (isNewPasswordCorrect ? styles.signUpInputSuccess : styles.signUpInputError) : ''
          }`}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          className={styles.signUpInput}
        />

          <button
            type="submit"
            className={!isNewPasswordCorrect ? styles.disabled : undefined}
            disabled={!isNewPasswordCorrect}
          >
            Sign up
          </button>



        <button
          type="button"
          className={styles.existingAccountButton}
          onClick={onExistingAccountClick}
        >
          I already have account
        </button>

        {isConfirmedPasswordWrong ? (
          <p className={styles.errorMessage}>Passwords are not same</p>
        ) : null}
      </form>
    </div>
  );
};

export default RegistrationPage;
