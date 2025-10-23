import React from 'react';
import { connect } from 'react-redux';
import * as styles from './UserProfilePage.module.css';

const UserProfilePage = (props) => {
  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        {props.profile.username}'s Profile
      </div>

      <div className={styles.profileInfo}>
        <div>
          <span className={styles.statLabel}>User Name:</span>{' '}
          {props.profile.username}
        </div>
        <div>
          <span className={styles.statLabel}>User ID:</span> {props.profile.id}
        </div>
        <div>
          <span className={styles.statLabel}>User Role:</span>{' '}
          {props.profile.role}
        </div>
        <div>
          <span className={styles.statLabel}>Snippets Count:</span>{' '}
          {props.profile.statistic.snippetsCount}
        </div>
        <div>
          <span className={styles.statLabel}>Rating:</span>{' '}
          {props.profile.statistic.rating}
        </div>
        <div>
          <span className={styles.statLabel}>Comments Count:</span>{' '}
          {props.profile.statistic.commentsCount}
        </div>
        <div>
          <span className={styles.statLabel}>Likes Count:</span>{' '}
          {props.profile.statistic.likesCount}
        </div>
        <div>
          <span className={styles.statLabel}>Dislikes Count:</span>{' '}
          {props.profile.statistic.dislikesCount}
        </div>
        <div>
          <span className={styles.statLabel}>Questions Count:</span>{' '}
          {props.profile.statistic.questionsCount}
        </div>
        <div>
          <span className={styles.statLabel}>Correct Answers Count:</span>{' '}
          {props.profile.statistic.correctAnswersCount}
        </div>
        <div>
          <span className={styles.statLabel}>Regular Answers Count:</span>{' '}
          {props.profile.statistic.regularAnswersCount}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.usersPage.selectedUserProfile,
  };
};

export default connect(mapStateToProps, null)(UserProfilePage);
