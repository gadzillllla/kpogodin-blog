import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ deleteItem, admin, userUid, authorUid }) =>
  admin || userUid === authorUid ? (
    <div className={styles.container}>
      {' '}
      |{' '}
      <button onClick={deleteItem} className={styles.btn}>
        delete
      </button>
    </div>
  ) : null;

const mapStateToProps = state => ({
  admin: state.userReducer.admin,
  userUid: state.userReducer.userUid,
});

export default connect(mapStateToProps)(DeleteButton);
