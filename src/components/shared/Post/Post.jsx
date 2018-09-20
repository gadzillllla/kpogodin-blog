import React, { Component } from 'react';
import styles from './Post.module.scss';


const Post = ({ text, author, date }) => {
    return (
        <div className={styles.root}>
            <span>{date}</span>
            <span>{author}</span>
            <div className={styles.test}>{text} </div>
        </div>
    )
}


export default Post;
