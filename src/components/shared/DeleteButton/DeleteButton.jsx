import React, { Component } from 'react';
import styles from './DeleteButton.module.css';
import { connect } from 'react-redux';
import { databasePosts, appDB } from 'DBconfig/DB_CONFIG';

const DeleteButton = ({ deleteItem, admin, userUid, authorUid }) =>
  admin || userUid === authorUid ? (
    <button className={styles.deleteButton} onClick={deleteItem}>
      delete
    </button>
  ) : null;

const mapStateToProps = state => ({
  admin: state.userReducer.admin,
  userUid: state.userReducer.userUid,
});

export default connect(mapStateToProps)(DeleteButton);
