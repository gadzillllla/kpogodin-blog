import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { databasePosts } from 'DBconfig/DB_CONFIG';
import { userLogin, userLogout } from 'actions/userActions';
import PropTypes from 'prop-types';
import styles from './addCommentForm.module.css';

class AddCommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  addComment = values => {
    databasePosts
      .child(this.props.id)
      .child('comments')
      .push()
      .set({
        txt: values.txt,
        author: this.props.username,
      });
  };

  render() {
    return (
      <Form
        onSubmit={this.addComment}
        render={({ handleSubmit }) => (
          <form className={styles.root} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <Field name="txt" component="textarea" type="text" placeholder="dfgdfgdf" />
            </div>
            <button type="submit"> отправить</button>
          </form>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.userReducer.username,
});

// LoginForm.propTypes = {
//   userLogin: PropTypes.func.isRequired,
//   userLogout: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
// };

export default connect(mapStateToProps)(AddCommentForm);