import React from 'react';
import styles from './LoginButton.module.css';
import cn from 'classnames';

const getClassName = type => cn(styles.root, styles[type]);

const LoginButton = ({ type, onClick, svg }) => (
  <button className={getClassName(type)} style={{ width: '100%' }} onClick={onClick}>
    <div className={styles.icon}>{svg}</div>
    Enter with {type}
  </button>
);

export default LoginButton;
