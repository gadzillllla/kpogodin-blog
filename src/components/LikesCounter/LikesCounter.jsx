import React, { Component } from 'react';
import { connect } from 'react-redux';
import { databasePosts, appDB } from 'DBconfig/DB_CONFIG';
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

  searchIdByAuthor = (arr, userUid) => {
    return arr.reduce((acc, elem) => {
      if (elem.from === userUid) acc = elem.id;
      return acc;
    }, '');
  };

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

  render() {
    const { likes } = this.state;
    return (
      <div className={styles.root}>
        <button onClick={this.addLike}>likes {likes.length}</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userUid: state.userReducer.userUid,
});

// LikesCounter.propTypes = {
//   loaded: PropTypes.bool.isRequired,
//   blogLoaded: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps)(LikesCounter);
