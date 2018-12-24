import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { databasePosts } from 'DBconfig/DB_CONFIG';
import { userLogin, userLogout } from 'actions/userActions';
import PropTypes from 'prop-types';
import styles from './AddPostForm.module.css';
import { Button } from 'antd';

const addPost = values => {
  let date = new Date().getTime();
  databasePosts.push().set({
    title: values.title,
    txt: values.txt,
    time: date,
  });
};

const validate = values => {
  const errors = {};
  if (!values.title || values.title.length < 3) {
    errors.title = 'Нужно больше символов';
  }
  if (!values.txt || values.txt.length < 3) {
    errors.txt = 'Нужно больше символов';
  }
  return errors;
};

const AddPostForm = () => {
  return (
    <Form
      onSubmit={addPost}
      validate={validate}
      render={({ handleSubmit, invalid }) => (
        <form className={styles.root} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <Field className={styles.title} name="title" component="input" type="text" placeholder="Заголовок" />
            <Field className={styles.txt} name="txt" component="textarea" type="text" placeholder="Текст" />
          </div>
          <button className={styles.btn} type="submit" disabled={invalid}>
            отправить
          </button>
        </form>
      )}
    />
  );
};

export default AddPostForm;
