import React from 'react';
import styles from './ToDoCheckbox.module.css';

const ToDoCheckbox = ({ disabled, label }) => (
  <div>
    <input type="checkbox" name="scales" disabled={disabled} />
    <label className={styles.label} for="scales">
      {label}
    </label>
  </div>
);

export default ToDoCheckbox;
