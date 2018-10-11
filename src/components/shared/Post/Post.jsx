import React, { Component } from 'react';
import styles from './Post.module.css';
import { databasePosts, appDB } from 'DBconfig/DB_CONFIG';
import { connect } from 'react-redux';
import timeago from 'timeago.js';
import AddCommentForm from 'components/AddCommentForm';
import LikesCounter from 'components/LikesCounter';
import Comment from 'components/shared/Comment';
import DeleteButton from 'components/shared/DeleteButton';
import { sortObjByKey } from 'lib/utils';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      comments: [],
    };
  }
  componentWillMount() {
    const { comments, likes } = this.state;
    const { postId } = this.props;
    const previousComments = comments;

    databasePosts
      .child(`${postId}`)
      .child('comments')
      .on('child_added', snap => {
        previousComments.push({
          id: snap.key,
          txt: snap.val().txt,
          author: snap.val().author,
          authorUid: snap.val().authorUid,
          time: snap.val().time,
          userPicUrl: snap.val().userPicUrl,
        });
        this.setState({
          comments: previousComments,
        });
      });

    databasePosts
      .child(`${postId}`)
      .child('comments')
      .on('child_removed', snap => {
        previousComments.forEach((elem, index) => {
          if (elem.id === snap.key) {
            previousComments.splice(index, 1);
          }
        });

        this.setState({
          comments: previousComments,
        });
      });
  }

  getTimeAgo = () => {
    return timeago().format(this.props.time);
  };

  handleRemovePost = () => {
    console.log(this.props.postId);
    databasePosts.child(this.props.postId).remove();
  };

  render() {
    const { text, title, postId, time, userPicUrl } = this.props;
    const { comments, likes } = this.state;

    return (
      <div className={styles.root}>
        <div className={styles.post}>
          <DeleteButton deleteItem={this.handleRemovePost} />

          <h1 className={styles.test}>{title} </h1>
          <div className={styles.test}>{text} </div>
          <span className={styles.time}>{this.getTimeAgo()}</span>
          <LikesCounter count={likes.length} postId={postId} likesList={likes} />
          <AddCommentForm id={postId} />
        </div>

        {sortObjByKey(comments.slice(), 'time').map(elem => (
          <Comment
            userPicUrl={elem.userPicUrl}
            postId={postId}
            id={elem.id}
            author={elem.author}
            authorUid={elem.authorUid}
            time={elem.time}
            txt={elem.txt}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userUid: state.blogReducer.userUid,
});

// Post.propTypes = {
//   loaded: PropTypes.bool.isRequired,
//   blogLoaded: PropTypes.func.isRequired,
// };

export default connect(
  mapStateToProps,
  {},
)(Post);
