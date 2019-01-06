import React from 'react';
import styles from './CurrentAvatar.module.css';

const defaultAvatarUrl =
  'https://firebasestorage.googleapis.com/v0/b/kpogodin-blog73.appspot.com/o/img%2FdefaultAva.jpg?alt=media&token=bb737f87-54f6-4880-8738-39de8e5bbf3c';

const CurrentAvatar = ({ userPicUrl }) => {
  let url = userPicUrl === 'default' || !userPicUrl ? defaultAvatarUrl : userPicUrl;
  return (
    <img
      style={{
        width: '50px',
        height: '50px',
      }}
      className={styles.root}
      src={url}
      alt="avatar"
    />
  );
};

export default CurrentAvatar;
