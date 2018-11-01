import React, { Component } from 'react';
import styles from './Comment.module.css';
import { databasePosts, appDB } from 'DBconfig/DB_CONFIG';
import timeago from 'timeago.js';
import DeleteButton from 'components/shared/DeleteButton';
import Avatar from 'components/shared/Avatar';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  handleRemovePost = () => {
    console.log(this.props.id);
    databasePosts
      .child(`${this.props.postId}`)
      .child('comments')
      .child(this.props.id)
      .remove();
  };

  getTimeAgo = () => timeago().format(this.props.time);

  render() {
    const { id, txt, author, authorUid, userPicUrl } = this.props;
    console.log(userPicUrl);
    return (
      <div className={styles.root} key={id}>
        <div className={styles.avatar}>
          <Avatar userPicUrl={userPicUrl} />
        </div>
        <div className={styles.comment}>
          <DeleteButton deleteItem={this.handleRemovePost} authorUid={authorUid} />
          <div className={styles.header}>
            <h5 className={styles.author}>{author}</h5>
            <span className={styles.time}>{this.getTimeAgo()}</span>
          </div>
          <span className={styles.txt}>{txt}</span>
        </div>
      </div>
    );
  }
}

export default Comment;
