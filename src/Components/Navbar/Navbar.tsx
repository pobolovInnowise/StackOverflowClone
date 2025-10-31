import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import homeIcon from '../../assets/home-icon.png';
import usersIcon from '../../assets/users-icon.png';
import questionsIcon from '../../assets/question-icon.png';
import userIcon from '../../assets/user-icon.png';
import codeSnippet from '../../assets/code-snippet.svg';
import snippets from '../../assets/snippets.png';
import { useAppSelector } from '../../Redux/hooks';

const Navbar = () => {
  const loggedInUsername = useAppSelector((state) => state.auth.loggedInUsername);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <nav className={styles.navbar}>
      <div className={styles.username}>
        <b>{loggedInUsername}</b>
      </div>

      <NavLink to="/home" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        <img src={homeIcon} alt="homeIcon" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/my-account"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        style={{
          pointerEvents: !isLoggedIn ? 'none' : 'auto',
          opacity: !isLoggedIn ? 0.5 : 1,
        }}
      >
        <img src={userIcon} alt="userIcon" />
        <span>My account</span>
      </NavLink>

      <NavLink
        to="/post-snippet"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        style={{
          pointerEvents: !isLoggedIn ? 'none' : 'auto',
          opacity: !isLoggedIn ? 0.5 : 1,
        }}
      >
        <img src={codeSnippet} alt="codeSnippet" />
        <span>Post snippet</span>
      </NavLink>

      <NavLink
        to="/my-snippets"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        style={{
          pointerEvents: !isLoggedIn ? 'none' : 'auto',
          opacity: !isLoggedIn ? 0.5 : 1,
        }}
      >
        <img src={snippets} alt="snippets" />
        <span>My snippets</span>
      </NavLink>

      <NavLink to="/questions" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        <img src={questionsIcon} alt="questionsIcon" />
        <span>Questions</span>
      </NavLink>

      <NavLink
        to="/my-questions"
        className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        style={{
          pointerEvents: !isLoggedIn ? 'none' : 'auto',
          opacity: !isLoggedIn ? 0.5 : 1,
        }}
      >
        <img src={questionsIcon} alt="questionsIcon" />
        <span>My questions</span>
      </NavLink>

      <NavLink to="/users" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
        <img src={usersIcon} alt="usersIcon" />
        <span>Users</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;

