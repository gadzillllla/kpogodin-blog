import React from 'react';
import { Icon, Spin } from 'antd';
import styles from './Loader.module.css';
import './spin.css';

const Loader = () => (
  <div className={styles.container}>
    <h1>KPOGODIN</h1>
    <div class="cssload-container">
      <div class="cssload-speeding-wheel" />
    </div>
  </div>
);

export default Loader;
