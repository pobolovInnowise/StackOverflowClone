import React from 'react';
import * as styles from './Header.module.css';
import logo from '../../assets/logo-stackoverflow.svg';
import LoginPage from '../../Pages/LoginPage/LoginPage.jsx';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setIsLoggedInAC,
  setLoggedInIdAC,
  setLoggedInRoleAC,
  setLoggedInStatisticAC,
  setLoggedInUsernameInAC,
} from '../../Redux/authReducer.js';
import Api from '../../Api/api';
import { clearMySnippetsAC } from '../../Redux/mySnippetsPageReducer.js';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate('/');
  };

  const api = new Api();

  const onLogoutClick = async () => {
    const response = await api.logoutUser();
    if (response.statusText === 'OK') {
      props.setLoggedInUsername('');
      props.setLoggedInId();
      props.setLoggedInRole('');
      props.setIsLoggedIn(false);
      props.setLoggedInStatistic({
        snippetsCount: null,
        rating: null,
        commentsCount: null,
        likesCount: null,
        dislikesCount: null,
        questionsCount: null,
        correctAnswersCount: null,
        regularAnswersCount: null,
      });
      props.clearMySnippets();
    }
  };

  if (props.isLoggedIn) {
    return (
      <header className={styles.header}>
        <div className={styles.headerLogo} onClick={onLogoClick}>
          <img src={logo} alt="logo-stack" />
        </div>
        <div className={styles.headerButtons}>
          <button className={styles.headerButtonsLogin} onClick={onLogoutClick}>
            Log out
          </button>
        </div>
      </header>
    );
  } else {
    return (
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <img src={logo} alt="logo-stack" />
        </div>
        <div className={styles.headerButtons}>
          <NavLink to="/login">
            <button className={styles.headerButtonsLogin}>Log in</button>
          </NavLink>
          <NavLink to="/register">
            <button className={styles.headerButtonsSignup} onClick={() => {}}>
              Sign up
            </button>
          </NavLink>
        </div>
      </header>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoggedIn: (status) => {
      dispatch(setIsLoggedInAC(status));
    },
    setLoggedInUsername: (username) => {
      dispatch(setLoggedInUsernameInAC(username));
    },
    setLoggedInId: (id) => {
      dispatch(setLoggedInIdAC(id));
    },
    setLoggedInRole: (role) => {
      dispatch(setLoggedInRoleAC(role));
    },
    setLoggedInStatistic: (statistic) => {
      dispatch(setLoggedInStatisticAC(statistic));
    },
    clearMySnippets: () => {
      dispatch(clearMySnippetsAC());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
