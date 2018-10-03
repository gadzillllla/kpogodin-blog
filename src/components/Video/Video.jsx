import React from 'react';
import ReactPlayer from 'react-player';
import styles from './Video.module.css';

const Video = () => (
  <div className={styles.root}>
    <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" youtubeConfig={{ playerVars: { showinfo: 1 } }} />
  </div>
);

export default Video;
