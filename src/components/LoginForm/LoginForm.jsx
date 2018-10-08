import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { appDB, facebookProvider, googleProvider } from 'DBconfig/DB_CONFIG';
import { userLogin, userLogout } from 'actions/userActions';
import PropTypes from 'prop-types';
import styles from './LoginForm.module.css';
import SvgKey from 'components/shared/SVG/key';
import SvgLogin from 'components/shared/SVG/login';
import SignUpForm from 'components/SignUpForm';

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
    const { userLogin, userLogout } = this.props;
    appDB.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user', user);
        console.log('data', user.providerData[0].providerId);
        const shortEmail = String(user.email).split('@')[0];
        user.displayName ? userLogin(user.displayName) : userLogin(shortEmail);
        localStorage.setItem('user', user.uid);
      } else {
        userLogout();
        localStorage.removeItem('user');
      }
    });
  };

  facebookLogin = () => {
    appDB
      .auth()
      .signInWithPopup(facebookProvider)
      .then(result => {
        console.log(result);
      });
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
            <button type="button" onClick={this.facebookLogin}>
              fb
            </button>
            <button type="button" onClick={this.googleLogin}>
              google
            </button>
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
  { userLogin, userLogout },
)(LoginForm);
