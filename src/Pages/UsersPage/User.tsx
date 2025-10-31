import styles from './User.module.css';
import { UserType } from '../../Types/types';

type Properties = {
  user: UserType;
  onClick: (id: number) => void;
};
const User = ({ user, onClick }:Properties) => {
  return (
    <div className={styles.userCard} onClick={() => onClick(user.id)}>
      <div className={styles.userInfo}>
        <span className={styles.userName}>User name: {user.username}</span>
        <span className={styles.userId}>ID: {user.id}</span>
        <span>Role: {user.role}</span>
      </div>
    </div>
  );
};

export default User;
