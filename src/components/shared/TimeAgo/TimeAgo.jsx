import React from 'react';
import styles from './TimeAgo.module.css';
import { format } from 'timeago.js';

const TimeAgo = ({ time }) => <span className={styles.time}>{format(time)}</span>;

export default TimeAgo;
