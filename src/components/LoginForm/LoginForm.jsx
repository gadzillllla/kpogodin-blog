import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { Icon, Divider } from 'antd';
import { connect } from 'react-redux';
import { appDB, facebookLogin, googleLogin } from 'DBconfig/DB_CONFIG';
import { userLogin, userLogout, adminMode, loginModalClose } from 'actions/userActions';
import PropTypes from 'prop-types';
import Button from 'components/shared/Button';
import Modal from 'react-responsive-modal';
import styles from './LoginForm.module.css';
import adminToken from 'DBconfig/DB_ADMIN_TOKEN';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'login',
      error: '',
    };
  }
  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    const { userLogin, userLogout, adminMode } = this.props;
    appDB.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        const shortEmail = String(user.email).split('@')[0];
        user.displayName
          ? userLogin(user)
          : userLogin({
              displayName: shortEmail,
              uid: user.uid,
            });
        localStorage.setItem('user', user.uid);
        if (user.uid === adminToken) {
          adminMode();
        }
      } else {
        userLogout();
        localStorage.removeItem('user');
      }
    });
  };

  singUp = values => {
    if (values.password === values.passwordConfirm) {
      appDB
        .auth()
        .createUserWithEmailAndPassword(values.login, values.password)
        .then()
        .catch(error => {
          this.setState({
            error: error.message,
          });
        });
    } else
      this.setState({
        error: 'passwords not match',
      });
  };

  onSubmit = values => appDB.auth().signInWithEmailAndPassword(values.login, values.password);

  toSignUp = () =>
    this.setState({
      form: 'signUp',
    });

  toLogin = () => {
    this.setState({
      form: 'login',
    });
  };

  onCloseModal = () => {
    this.setState({ modal: false });
  };

  renderLoginForm = () => (
    <Form
      onSubmit={this.onSubmit}
      render={({ handleSubmit }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <div className={styles.form}>
            <Field className={styles.input} name="login" component="input" type="text" placeholder="email" />
            <Field className={styles.input} name="password" component="input" type="password" placeholder="password" />
            <div className={styles.buttons}>
              <Button label="РЕГИСТРАЦИЯ" ghost onClick={this.toSignUp} />
              <Button label="ВОЙТИ" type="submit" />
            </div>
            <div className={styles.social}>
              <p>Другие способы входа</p>
              <div>
                <Icon className={styles.button} onClick={googleLogin} type="google" theme="outlined" />
                <Icon className={styles.button} onClick={facebookLogin} type="facebook" theme="outlined" />
              </div>
            </div>
          </div>
        </form>
      )}
    />
  );

  renderSignUpForm = () => (
    <Form
      onSubmit={this.singUp}
      render={({ handleSubmit }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <Icon className={styles.icon} type="user" theme="outlined" />
            <Field className={styles.input} name="login" component="input" type="text" placeholder="email" />
          </div>
          <div className={styles.row}>
            <Icon className={styles.icon} type="lock" theme="outlined" />
            <Field className={styles.input} name="password" component="input" type="password" placeholder="password" />
          </div>
          <div className={styles.row}>
            <Icon className={styles.icon} type="lock" theme="outlined" />
            <Field
              className={styles.input}
              name="passwordConfirm"
              component="input"
              type="password"
              placeholder="confirm password"
            />
          </div>
          <div className={styles.buttons}>
            <Button label="< НАЗАД" ghost onClick={this.toLogin} />
            <Button label="OK" type="submit" />
          </div>
          <p>{this.state.error}</p>
        </form>
      )}
    />
  );

  renderContent = () => {
    return this.state.form === 'signUp' ? this.renderSignUpForm() : this.renderLoginForm();
  };

  render() {
    const { username, modal, userPicUrl } = this.props;
    if (username) {
      return (
        <div className={styles.userInfo}>
          <span className={styles.username}> {username} </span>
          <Icon className={styles.button} onClick={this.logout} type="logout" theme="outlined" />
        </div>
      );
    }
    return (
      <Modal
        open={modal}
        classNames={{
          overlay: styles.customOverlay,
          modal: styles.customModal,
        }}
        onClose={this.props.loginModalClose}
      >
        {this.renderContent()}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  username: state.userReducer.username,
  userPicUrl: state.userReducer.userPicUrl,
  modal: state.userReducer.loginModalOpen,
});

LoginForm.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  { userLogin, userLogout, adminMode, loginModalClose },
)(LoginForm);
