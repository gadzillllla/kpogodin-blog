import React from 'react';
import { connect } from 'react-redux';
import Svg from 'components/shared/SVG/delete';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ deleteItem, admin, userUid, authorUid }) =>
  admin || userUid === authorUid ? (
    <button className={styles.deleteButton} onClick={deleteItem}>
      <Svg />
    </button>
  ) : null;

const mapStateToProps = state => ({
  admin: state.userReducer.admin,
  userUid: state.userReducer.userUid,
});

export default connect(mapStateToProps)(DeleteButton);
