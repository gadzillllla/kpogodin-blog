import React, { Component } from 'react';
import styles from './Comment.module.css';
import { databasePosts } from 'DBconfig/DB_CONFIG';
import TimeAgo from 'components/shared/TimeAgo';
import DeleteButton from 'components/shared/DeleteButton';
import Avatar from 'components/shared/Avatar';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  handleRemovePost = () => {
    databasePosts
      .child(`${this.props.postId}`)
      .child('comments')
      .child(this.props.id)
      .remove();
  };

  render() {
    const { id, txt, author, authorUid, userPicUrl, time } = this.props;
    return (
      <div className={styles.root} key={id}>
        <div className={styles.avatar}>
          <Avatar userPicUrl={userPicUrl} size="50px" />
        </div>
        <div className={styles.comment}>
          <div className={styles.header}>
            <h5 className={styles.author}>{author}</h5>
          </div>
          <span className={styles.txt}>{txt}</span>
          <div className={styles.bottom}>
            <TimeAgo time={time} />
            <DeleteButton deleteItem={this.handleRemovePost} authorUid={authorUid} />
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
