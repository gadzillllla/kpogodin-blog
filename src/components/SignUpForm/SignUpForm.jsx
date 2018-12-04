import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { appDB, facebookProvider, googleProvider } from 'DBconfig/DB_CONFIG';
import { userLogin, userLogout } from 'actions/userActions';
import PropTypes from 'prop-types';
import styles from './LoginForm.module.css';
import SvgKey from 'components/shared/SVG/key';
import SvgLogin from 'components/shared/SVG/login';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }

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

  render() {
    return (
      <Form
        onSubmit={this.singUp}
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
            <div className={styles.row}>
              <SvgKey className={styles.icon} />
              <Field name="passwordConfirm" component="input" type="password" placeholder="Пароль еще раз" />
            </div>
            <button type="submit"> Зарегистрироваться</button>
            <button type="button" onClick={this.props.back}>
              войти
            </button>
            <p>{this.state.error}</p>
          </form>
        )}
      />
    );
  }
}

export default SignUpForm;
