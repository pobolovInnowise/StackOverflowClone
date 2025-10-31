import { useAppSelector } from '../../Redux/hooks';
import styles from './UserProfilePage.module.css';
import { UserProfileType } from '../../Types/types';

const UserProfilePage = () => {
  const profile: UserProfileType = useAppSelector(
    (state) => state.usersPage.selectedUserProfile
  );

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>{profile.username}'s Profile</div>

      <div className={styles.profileInfo}>
        <div>
          <span className={styles.statLabel}>User Name:</span>{' '}
          {profile.username}
        </div>
        <div>
          <span className={styles.statLabel}>User ID:</span> {profile.id}
        </div>
        <div>
          <span className={styles.statLabel}>User Role:</span> {profile.role}
        </div>
        <div>
          <span className={styles.statLabel}>Snippets Count:</span>{' '}
          {profile.statistic.snippetsCount}
        </div>
        <div>
          <span className={styles.statLabel}>Rating:</span>{' '}
          {profile.statistic.rating}
        </div>
        <div>
          <span className={styles.statLabel}>Comments Count:</span>{' '}
          {profile.statistic.commentsCount}
        </div>
        <div>
          <span className={styles.statLabel}>Likes Count:</span>{' '}
          {profile.statistic.likesCount}
        </div>
        <div>
          <span className={styles.statLabel}>Dislikes Count:</span>{' '}
          {profile.statistic.dislikesCount}
        </div>
        <div>
          <span className={styles.statLabel}>Questions Count:</span>{' '}
          {profile.statistic.questionsCount}
        </div>
        <div>
          <span className={styles.statLabel}>Correct Answers Count:</span>{' '}
          {profile.statistic.correctAnswersCount}
        </div>
        <div>
          <span className={styles.statLabel}>Regular Answers Count:</span>{' '}
          {profile.statistic.regularAnswersCount}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
