import React from 'react';
import styles from './User.module.css';

const User = ({ user, onClick }) => {
  return (
    <div className={styles.userCard} onClick={() => onClick(user.id)}>
      <div className={styles.userInfo}>
        <span className={styles.userName}>{user.username}</span>
        <span className={styles.userId}>ID: {user.id}</span>
      </div>
    </div>
  );
};

export default User;
