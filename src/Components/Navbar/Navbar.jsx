import React from 'react';
import { NavLink } from 'react-router-dom';
import * as styles from './Navbar.module.css';
import homeIcon from '../../assets/home-icon.png';
import usersIcon from '../../assets/users-icon.png';
import questionsIcon from '../../assets/question-icon.png';
import userIcon from '../../assets/user-icon.png';
import codeSnippet from '../../assets/code-snippet.svg';
import snippets from '../../assets/snippets.png';
import { connect } from 'react-redux';

const Navbar = (props) => {
  return (
    <div className={styles.navbar}>
      <div style={{ color: '#0074cc' }}>
        <b>{props.loggedInUsername}</b>
      </div>
      <div>
        <img src={homeIcon} alt="homeIcon" />
        <NavLink to="/home">Home</NavLink>
      </div>
      <div>
        <img src={userIcon} alt="userIcon" />
        <NavLink
          to="/my-account"
          style={{
            pointerEvents: !props.isLoggedIn ? 'none' : 'auto',
            opacity: !props.isLoggedIn ? 0.5 : 1,
          }}
        >
          My account
        </NavLink>
      </div>
      <div>
        <img src={codeSnippet} alt="codeSnippet" />
        <NavLink
          to="/post-snippet"
          style={{
            pointerEvents: !props.isLoggedIn ? 'none' : 'auto',
            opacity: !props.isLoggedIn ? 0.5 : 1,
          }}
        >
          Post snippet
        </NavLink>
      </div>
      <div>
        <img src={snippets} alt="snippets" />
        <NavLink
          to="/my-snippets"
          style={{
            pointerEvents: !props.isLoggedIn ? 'none' : 'auto',
            opacity: !props.isLoggedIn ? 0.5 : 1,
          }}
        >
          My snippets
        </NavLink>
      </div>
      <div>
        <img src={questionsIcon} alt="questionsIcon" />
        <NavLink to="/questions">Questions</NavLink>
      </div>
      <div>
        <img src={usersIcon} alt="usersIcon" />
        <NavLink to="/users">Users</NavLink>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUsername: state.auth.loggedInUsername,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(Navbar);
