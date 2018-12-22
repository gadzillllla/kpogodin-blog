import React from 'react';
import styles from './SvgLink.module.css';

const SvgLink = props => (
  <a href={props.link} className={styles.link}>
    #{props.tag}
  </a>
);
