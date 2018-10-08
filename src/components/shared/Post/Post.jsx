import React, { Component } from 'react';
import styles from './Post.module.css';
import { databasePosts, appDB } from 'DBconfig/DB_CONFIG';
import { connect } from 'react-redux';
import AddCommentForm from 'components/AddCommentForm';
import LikesCounter from 'components/LikesCounter';
import Comment from 'components/shared/Comment';
import DeleteButton from 'components/shared/DeleteButton';

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

  handleRemovePost = () => {
    console.log(this.props.postId);
    databasePosts.child(this.props.postId).remove();
  };

  render() {
    const { text, title, postId } = this.props;
    const { comments, likes } = this.state;

    return (
      <div className={styles.root}>
        <DeleteButton deleteItem={this.handleRemovePost} />
        <span>{postId}</span>
        <h1 className={styles.test}>{title} </h1>
        <div className={styles.test}>{text} </div>
        <LikesCounter count={likes.length} postId={postId} likesList={likes} />
        <AddCommentForm id={postId} />
        {comments.reverse().map(elem => (
          <Comment postId={postId} id={elem.id} author={elem.author} authorUid={elem.authorUid} txt={elem.txt} />
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
