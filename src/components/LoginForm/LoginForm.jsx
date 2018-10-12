import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { appDB, facebookProvider, googleProvider } from 'DBconfig/DB_CONFIG';
import { userLogin, userLogout, adminMode } from 'actions/userActions';
import PropTypes from 'prop-types';
import styles from './LoginForm.module.css';
import LoginButton from 'components/LoginButton';
import SvgKey from 'components/shared/SVG/key';
import SvgLogin from 'components/shared/SVG/login';
import SignUpForm from 'components/SignUpForm';
import adminToken from 'DBconfig/DB_ADMIN_TOKEN';
import Facebook from 'components/shared/SVG/facebook';
import Google from 'components/shared/SVG/google';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: 'login',
    };
  }
  componentDidMount() {
    this.authListener();
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

  render() {
    const { username } = this.props;
    const { form } = this.state;
    if (username) {
      return (
        <div>
          <p>{username}</p>
          <button type="button" onClick={this.logout} />
        </div>
      );
    }

    if (form === 'signUp') {
      return <SignUpForm back={this.toLogin} />;
    }

    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit }) => (
          <form className={styles.root} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <SvgLogin className={styles.icon} />
              <Field name="login" component="input" type="text" placeholder="Логин" />
            </div>
            <div className={styles.row}>
              <SvgKey className={styles.icon} />
              <Field name="password" component="input" type="password" placeholder="Пароль" />
            </div>
            <button type="submit"> вход</button>
            <button type="button" onClick={this.toSignUp}>
              Зарегистрироваться
            </button>
            <LoginButton svg={<Facebook />} type="Facebook" onClick={this.facebookLogin} />
            <LoginButton svg={<Google />} type="Google" onClick={this.googleLogin} />
          </form>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.userReducer.username,
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
