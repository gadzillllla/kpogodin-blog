import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { databasePosts } from 'DBconfig/DB_CONFIG';
import { userLogin, userLogout } from 'actions/userActions';
import PropTypes from 'prop-types';
import styles from './AddPostForm.module.css';

const addPost = values => {
  databasePosts.push().set({
    title: values.title,
    txt: values.txt,
  });
};

const AddPostForm = () => (
  <Form
    onSubmit={addPost}
    render={({ handleSubmit }) => (
      <form className={styles.root} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <Field name="title" component="input" type="text" placeholder="Заголовок" />
        </div>
        <div className={styles.row}>
          <Field name="txt" component="textarea" type="text" placeholder="Текст" />
        </div>
        <button type="submit"> отправить</button>
      </form>
    )}
  />
);

export default AddPostForm;
