import React from 'react';
import { Icon, Spin } from 'antd';
import styles from './Loader.module.css';
import './spin.css';
import { divide } from 'ramda';

const Loader = () => (
  <div className={styles.root}>
    <div className={styles.container}>
      <h1>KPOGODIN</h1>
      <div class="cssload-container">
        <div class="cssload-speeding-wheel" />
      </div>
    </div>
  </div>
);

export default Loader;
