import React from 'react';
import styles from './TimeAgo.module.css';
import timeago from 'timeago.js';

const TimeAgo = ({ time }) => <span className={styles.time}>{timeago().format(time)}</span>;

export default TimeAgo;
