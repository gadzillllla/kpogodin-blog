import React from 'react';
import styles from './Avatar.module.css';

const defaultAvatarUrl =
  'https://firebasestorage.googleapis.com/v0/b/kpogodin-blog73.appspot.com/o/img%2FdefaultAva.jpg?alt=media&token=bb737f87-54f6-4880-8738-39de8e5bbf3c';

const Avatar = ({ userPicUrl }) =>  {
  let url = userPicUrl === 'default' ? defaultAvatarUrl : userPicUrl
  console.log(url, userPicUrl)
  return(
<img className={styles.root} src={url} alt="avatar" />
  )
}

export default Avatar;
