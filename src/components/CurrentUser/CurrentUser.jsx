import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/shared/Button';
import Avatar from 'components/shared/Avatar';
import { loginModalOpen } from 'actions/userActions';
import styles from './CurrentUser.module.css';

const CurrentUser = ({ username, loginModalOpen, userPicUrl }) => {
  return username ? (
    <div className={styles.root}>
      <span className={styles.username}> {username} </span>
      <Avatar userPicUrl={userPicUrl} size={25} />
    </div>
  ) : (
    <Button onClick={loginModalOpen} ghost label="ВОЙТИ" />
  );
};

const mapStateToProps = state => ({
  username: state.userReducer.username,
  userPicUrl: state.userReducer.userPicUrl,
});

// LoginForm.propTypes = {
//   username: PropTypes.string.isRequired,
// };

export default connect(
  mapStateToProps,
  { loginModalOpen },
)(CurrentUser);
