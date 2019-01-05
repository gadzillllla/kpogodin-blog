import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/shared/Button';
import { loginModalOpen } from 'actions/userActions';
import styles from './CurrentUser.module.css';

const renderLoginButton = () => {};

const CurrentUser = ({ username, loginModalOpen }) => {
  return username ? (
    <div>
      <span className={styles.username}> {username} </span>
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
