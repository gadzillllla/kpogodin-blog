import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { databasePosts } from 'DBconfig/DB_CONFIG';
import styles from './addCommentForm.module.css';

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
          time: date,
        });
      values.txt = '';
    }
  };

  validate = values => {
    const errors = {};
    if (!values.txt || values.txt.length < 3) {
      errors.txt = 'Нужно больше символов';
    }
    return errors;
  };

  render() {
    return (
      <Form
        onSubmit={this.addComment}
        validate={this.validate}
        render={({ handleSubmit, invalid }) => (
          <form className={styles.root} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <Field name="txt" component="textarea" type="text" />
            </div>
            <button type="submit" disabled={invalid}>
              отправить
            </button>
          </form>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.userReducer.username,
  uid: state.userReducer.userUid,
});

// LoginForm.propTypes = {
//   userLogin: PropTypes.func.isRequired,
//   userLogout: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps)(AddCommentForm);
