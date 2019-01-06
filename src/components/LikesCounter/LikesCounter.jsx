import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { databasePosts } from 'DBconfig/DB_CONFIG';
import { loginModalOpen } from 'actions/userActions';
import styles from './LikesCounter.module.css';

class LikesCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: [],
    };
  }

  componentWillMount() {
    const { likes } = this.state;
    const { postId } = this.props;
    const previousLikes = likes;
    databasePosts
      .child(`${postId}`)
      .child('likes')
      .on('child_added', snap => {
        previousLikes.push({
          from: snap.val().from,
          id: snap.key,
        });

        this.setState({
          likes: previousLikes,
        });
      });
    databasePosts
      .child(`${postId}`)
      .child('likes')
      .on('child_removed', snap => {
        previousLikes.forEach((elem, index) => {
          if (elem.id === snap.key) {
            previousLikes.splice(index, 1);
          }
        });

        this.setState({
          likes: previousLikes,
        });
      });
  }

  searchIdByAuthor = (arr, userUid) =>
    arr.reduce((acc, elem) => {
      if (elem.from === userUid) acc = elem.id;
      return acc;
    }, '');

  addLike = () => {
    const { userUid, postId } = this.props;
    const { likes } = this.state;

    if (!this.searchIdByAuthor(likes, userUid)) {
      databasePosts
        .child(`${postId}`)
        .child('likes')
        .push()
        .set({
          from: userUid,
        });
    } else
      databasePosts
        .child(`${postId}`)
        .child('likes')
        .child(this.searchIdByAuthor(likes, userUid))
        .remove();
  };

  renderHeart = () => {
    const { likes } = this.state;
    const { userUid, logged } = this.props;
    const likeChecked = this.searchIdByAuthor(likes, userUid);
    if (!logged)
      return (
        <Icon
          type="heart"
          theme="filled"
          onClick={this.props.loginModalOpen}
          style={{ fontSize: '30px', color: '#888888' }}
        />
      );
    if (likeChecked) return <Icon type="heart" theme="filled" style={{ fontSize: '30px', color: '#d8342e' }} />;
    return <Icon type="heart" theme="outlined" className={styles.heart} />;
  };

  render() {
    const { likes } = this.state;
    const { logged } = this.props;
    return (
      <div className={styles.root}>
        <button disabled={!logged} className={styles.container} onClick={this.addLike}>
          {this.renderHeart()}
        </button>
        <span className={styles.counter}>{likes.length}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.userReducer.logged,
  userUid: state.userReducer.userUid,
});

// LikesCounter.propTypes = {
//   loaded: PropTypes.bool.isRequired,
//   blogLoaded: PropTypes.func.isRequired,
// };

export default connect(
  mapStateToProps,
  { loginModalOpen },
)(LikesCounter);
