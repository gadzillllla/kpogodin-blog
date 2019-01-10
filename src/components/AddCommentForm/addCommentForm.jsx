import React, { Component, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Button from 'components/shared/Button';
import { databasePosts } from 'DBconfig/DB_CONFIG';
import Avatar from 'components/shared/CurrentAvatar';
import styles from './addCommentForm.module.css';
import { divide } from 'ramda';

class AddCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addComment = values => {
    let date = new Date().getTime();
    if (values.txt.length > 3) {
      databasePosts
        .child(this.props.id)
        .child('comments')
        .push()
        .set({
          txt: values.txt,
          author: this.props.username,
          authorUid: this.props.uid,
          userPicUrl: this.props.userPicUrl,
          time: date,
        });
      values.txt = '';
    }
  };

  validate = values => {
    const errors = {};
    if (!values.txt || values.txt.length <= 3) {
      errors.txt = 'Нужно больше символов';
    }
    return errors;
  };

  renderForm = () => (
    <Form
      onSubmit={this.addComment}
      validate={this.validate}
      render={({ handleSubmit, invalid }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <Field
            className={styles.input}
            name="txt"
            component="textarea"
            type="text"
            placeholder="Напишите комментарий"
          />
          <Button label="Отправить" type="submit" disabled={invalid} />
        </form>
      )}
    />
  );

  render() {
    return this.renderForm();
  }
}

const mapStateToProps = state => ({
  username: state.userReducer.username,
  uid: state.userReducer.userUid,
  userPicUrl: state.userReducer.userPicUrl,
  logged: state.userReducer.logged,
});

// LoginForm.propTypes = {
//   userLogin: PropTypes.func.isRequired,
//   userLogout: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps)(AddCommentForm);
