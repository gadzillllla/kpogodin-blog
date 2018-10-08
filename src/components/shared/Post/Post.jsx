import React, { Component } from 'react';
import styles from './Post.module.css';
import { databasePosts, appDB } from 'DBconfig/DB_CONFIG';
import AddCommentForm from 'components/AddCommentForm';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }
  componentWillMount() {
    const { comments } = this.state;
    const { postId } = this.props;
    const previousComments = comments;
    console.log('post', this.props.postId, ', comments', comments);
    console.log(postId);
    databasePosts
      .child(`${postId}`)
      .child('comments')
      .on('child_added', snap => {
        previousComments.push({
          id: snap.key,
          txt: snap.val().txt,
          author: snap.val().author,
        });
        this.setState({
          comments: previousComments,
        });
      });
  }

  render() {
    const { text, title, postId } = this.props;
    const { comments } = this.state;

    return (
      <div className={styles.root}>
        <span>{postId}</span>
        <h1 className={styles.test}>{title} </h1>
        <div className={styles.test}>{text} </div>
        <AddCommentForm id={postId} />

        {comments.reverse().map(elem => (
          <div className={styles.comment} key={elem.id}>
            <p>{elem.author}</p>
            <p>{elem.txt}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Post;
