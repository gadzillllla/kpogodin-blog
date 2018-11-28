import React, { Component, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { Icon } from 'antd';
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
    if (!values.txt || values.txt.length < 3) {
      errors.txt = 'Нужно больше символов';
    }
    return errors;
  };

  renderForm = () => {
    const { userPicUrl } = this.props;
    return (
      <Fragment>
        <div className={styles.ava}>
          <Avatar userPicUrl={userPicUrl} size="50px" />
        </div>
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
                placeholder="Add a Comment..."
              />
              <button className={styles.btn} type="submit" disabled={invalid}>
                ADD
              </button>
            </form>
          )}
        />
      </Fragment>
    );
  };

  renderContent = () =>
    this.props.logged ? (
      this.renderForm()
    ) : (
      <p className={styles.tip}>
        <Icon type="exclamation-circle" theme="outlined" /> Чтобы оставлять комментарии и лайки, нужно авторизоваться
      </p>
    );

  render() {
    return <div className={styles.root}>{this.renderContent()}</div>;
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
