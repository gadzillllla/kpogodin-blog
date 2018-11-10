import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { appDB, facebookProvider, googleProvider } from 'DBconfig/DB_CONFIG';
import { userLogin, userLogout, adminMode } from 'actions/userActions';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import styles from './LoginForm.module.css';
import adminToken from 'DBconfig/DB_ADMIN_TOKEN';
import Avatar from 'components/shared/Avatar';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'login',
      modal: false,
      error: '',
    };
  }
  componentDidMount() {
    this.authListener();
    console.log(this.state.userPicUrl);
  }

  authListener = () => {
    const { userLogin, userLogout, adminMode } = this.props;
    appDB.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user', user);
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
          console.log(this.state.error);
        });
    } else
      this.setState({
        error: 'passwords not match',
      });
  };

  facebookLogin = () => {
    appDB.auth().signInWithPopup(facebookProvider);
  };

  googleLogin = () => {
    appDB.auth().signInWithPopup(googleProvider);
  };

  onSubmit = values => appDB.auth().signInWithEmailAndPassword(values.login, values.password);

  logout = () => appDB.auth().signOut();

  toSignUp = () =>
    this.setState({
      form: 'signUp',
    });

  toLogin = () => {
    this.setState({
      form: 'login',
    });
  };

  onOpenModal = () => {
    this.setState({ modal: true });
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
            <div className={styles.row}>
              <Icon className={styles.icon} type="user" theme="outlined" />
              <Field className={styles.input} name="login" component="input" type="text" placeholder="email" />
            </div>
            <div className={styles.row}>
              <Icon className={styles.icon} type="lock" theme="outlined" />
              <Field
                className={styles.input}
                name="password"
                component="input"
                type="password"
                placeholder="password"
              />
            </div>
            <div className={styles.buttons}>
              <button className={styles.secondButton} type="button" onClick={this.toSignUp}>
                SIGN UP
              </button>
              <button className={styles.mainButton} type="submit">
                LOGIN
              </button>
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
            <Field className={styles.input} name="login" component="input" type="text" placeholder="login" />
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
            <button className={styles.secondButton} type="button" onClick={this.toLogin}>
              BACK
            </button>
            <button className={styles.mainButton} type="submit">
              CONFIRM
            </button>
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
    const { username, userPicUrl } = this.props;
    const { modal } = this.state;
    if (username) {
      return (
        <div className={styles.userInfo}>
          <span className={styles.username}> {username} </span>
          <Icon className={styles.button} onClick={this.logout} type="logout" theme="outlined" />
        </div>
      );
    }
    return (
      <div>
        <Modal
          open={modal}
          classNames={{
            overlay: styles.customOverlay,
            modal: styles.customModal,
          }}
          onClose={this.onCloseModal}
        >
          {this.renderContent()}
        </Modal>
        <Icon className={styles.button} onClick={this.onOpenModal} type="login" theme="outlined" />
        <Icon className={styles.button} type="google" onClick={this.googleLogin} theme="outlined" />
        <Icon type="facebook" onClick={this.facebookLogin} theme="outlined" className={styles.button} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.userReducer.username,
  userPicUrl: state.userReducer.userPicUrl,
});

LoginForm.propTypes = {
  userLogin: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  { userLogin, userLogout, adminMode },
)(LoginForm);
