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
  const loggedInUsername: string = useAppSelector(
    (state) => state.auth.loggedInUsername
  );
  const isLoggedIn: boolean = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <div className={styles.navbar}>
      <div style={{ color: '#0074cc' }}>
        <b>{loggedInUsername}</b>
      </div>
      <div>
        <img src={homeIcon as string} alt="homeIcon" />
        <NavLink to="/home">Home</NavLink>
      </div>
      <div>
        <img src={userIcon as string} alt="userIcon" />
        <NavLink
          to="/my-account"
          style={{
            pointerEvents: !isLoggedIn ? 'none' : 'auto',
            opacity: !isLoggedIn ? 0.5 : 1,
          }}
        >
          My account
        </NavLink>
      </div>
      <div>
        <img src={codeSnippet as string} alt="codeSnippet" />
        <NavLink
          to="/post-snippet"
          style={{
            pointerEvents: !isLoggedIn ? 'none' : 'auto',
            opacity: !isLoggedIn ? 0.5 : 1,
          }}
        >
          Post snippet
        </NavLink>
      </div>
      <div>
        <img src={snippets as string} alt="snippets" />
        <NavLink
          to="/my-snippets"
          style={{
            pointerEvents: !isLoggedIn ? 'none' : 'auto',
            opacity: !isLoggedIn ? 0.5 : 1,
          }}
        >
          My snippets
        </NavLink>
      </div>
      <div>
        <img src={questionsIcon as string} alt="questionsIcon" />
        <NavLink to="/questions">Questions</NavLink>
      </div>
      <div>
        <img src={questionsIcon as string} alt="questionsIcon" />
        <NavLink
          to="/my-questions"
          style={{
            pointerEvents: !isLoggedIn ? 'none' : 'auto',
            opacity: !isLoggedIn ? 0.5 : 1,
          }}
        >
          My questions
        </NavLink>
      </div>
      <div>
        <img src={usersIcon as string} alt="usersIcon" />
        <NavLink to="/users">Users</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
