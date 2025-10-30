import * as styles from './Header.module.css';
import logo from '../../assets/logo-stackoverflow.svg';
import { NavLink } from 'react-router-dom';
import { logoutUserTC } from '../../Redux/authReducer';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isLoggedIn: boolean = useAppSelector((state) => state.auth.isLoggedIn);

  const onLogoClick = () => {
    navigate('/');
  };

  const onLogoutClick = async () => {
    await dispatch(logoutUserTC());
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <header className={styles.header}>
        <div className={styles.headerLogo} onClick={onLogoClick}>
          <img src={logo as string} alt="logo-stack" />
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
          <img src={logo as string} alt="logo-stack" />
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

export default Header;
