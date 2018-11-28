import React from 'react';
import { Icon, Spin } from 'antd';
import styles from './Loader.module.css';
import './spin.css';

const Loader = () => (
  <div className={styles.container}>
    <div class="cssload-container">
      <div class="cssload-speeding-wheel" />
    </div>
    <h1>KPOGODIN</h1>
  </div>
);

export default Loader;
