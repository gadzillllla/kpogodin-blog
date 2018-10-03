import React from 'react';
import styles from './Post.module.css';

const Post = ({ text, author, date }) => (
  <div className={styles.root}>
    <span>{date}</span>
    <span>{author}</span>
    <div className={styles.test}>{text} </div>
  </div>
);

export default Post;
