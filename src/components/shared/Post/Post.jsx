import React, { Component } from 'react';
import styles from './Post.module.css';
import { databasePosts, appDB } from 'DBconfig/DB_CONFIG';
import { connect } from 'react-redux';
import AddCommentForm from 'components/AddCommentForm';
import LikesCounter from 'components/LikesCounter';
import Comment from 'components/shared/Comment';
import TimeAgo from 'components/shared/TimeAgo';
import { loginModalOpen } from 'actions/userActions';
import Button from 'components/shared/Button';
import Tag from 'components/shared/Tag';
import DeleteButton from 'components/shared/DeleteButton';
import ReactHtmlParser from 'react-html-parser';
import { Icon } from 'antd';
import { sortObjByKey } from 'lib/utils';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
      comments: [],
      input: false,
    };
  }
  componentWillMount() {
    const { comments } = this.state;
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

  handleRemovePost = () => {
    databasePosts.child(this.props.postId).remove();
  };

  renderTags = () => {
    return (
      <div className={styles.tags}>
        {this.props.tags.map(elem => (
          <Tag tag={elem} />
        ))}
      </div>
    );
  };

  inputToggle = () => {
    const { logged } = this.props;
    if (logged) {
      this.setState({
        input: !this.state.input,
      });
    } else this.props.loginModalOpen();
  };

  renderCommentForm = () => {
    const { postId } = this.props;
    const { input } = this.state;
    return input ? <AddCommentForm id={postId} /> : null;
  };

  render() {
    const { text, title, postId, time } = this.props;
    const { comments, likes } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.post}>
          <div className={styles.top}>
            <h1 className={styles.title}>{title} </h1>
            <div className={styles.subtitle}>
              <TimeAgo time={time} />
              <DeleteButton deleteItem={this.handleRemovePost} />
            </div>
          </div>
          {ReactHtmlParser(text)}
        </div>
        {this.renderTags()}
        <div className={styles.buttons}>
          <Icon className={styles.commentTogle} type="message" onClick={this.inputToggle} />
          <LikesCounter count={likes.length} postId={postId} likesList={likes} />
        </div>
        <div className={styles.bottom}>{this.renderCommentForm()}</div>
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
  logged: state.userReducer.logged,
  userUid: state.blogReducer.userUid,
});

// Post.propTypes = {
//   loaded: PropTypes.bool.isRequired,
//   blogLoaded: PropTypes.func.isRequired,
// };

export default connect(
  mapStateToProps,
  { loginModalOpen },
)(Post);
