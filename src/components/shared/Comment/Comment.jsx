import React, { Component } from 'react';
import styles from './Comment.module.css';
import { databasePosts, appDB } from 'DBconfig/DB_CONFIG';
import timeago from 'timeago.js';
import DeleteButton from 'components/shared/DeleteButton';

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
    const { id, txt, author, authorUid } = this.props;
    return (
      <div className={styles.comment} key={id}>
        <p>{this.getTimeAgo()}</p>
        <p>{author}</p>
        <p>{txt}</p>
        <DeleteButton deleteItem={this.handleRemovePost} authorUid={authorUid} />
      </div>
    );
  }
}

export default Comment;