import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
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
      modal: false,
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
          name: snap.val().name,
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
    const { userUid, postId, username } = this.props;
    const { likes } = this.state;

    if (!this.searchIdByAuthor(likes, userUid)) {
      databasePosts
        .child(`${postId}`)
        .child('likes')
        .push()
        .set({
          from: userUid,
          name: username,
        });
    } else
      databasePosts
        .child(`${postId}`)
        .child('likes')
        .child(this.searchIdByAuthor(likes, userUid))
        .remove();
  };

  renderOtherUsersLink = arr =>
    arr.length > 2 && (
      <span className={styles.userLink} onClick={this.modalOpen}>
        {' '}
        <b>и еще {arr.length - 2}</b>
      </span>
    );

  renderUsers = arr => {
    if (arr.length === 0) return <span className={styles.counter} />;
    if (arr.length === 1) return <span className={styles.counter}>Нравится {arr[0].name}</span>;
    if (arr.length >= 2)
      return (
        <span className={styles.counter}>
          Нравится {arr[0].name}, {arr[1].name}
          {this.renderOtherUsersLink(arr)}
        </span>
      );
  };

  renderUserList = arr => (
    <div className={styles.usersList}>
      {arr.map(elem => (
        <span className={styles.counter}>{elem.name}</span>
      ))}
    </div>
  );

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
          style={{ fontSize: '26px', color: '#888888' }}
        />
      );
    if (likeChecked) return <Icon type="heart" theme="filled" style={{ fontSize: '26px', color: '#d8342e' }} />;
    return <Icon type="heart" theme="outlined" className={styles.heart} />;
  };

  modalOpen = () =>
    this.setState({
      modal: true,
    });

  modalClose = () =>
    this.setState({
      modal: false,
    });

  render() {
    const { likes, modal } = this.state;
    const { logged } = this.props;
    return (
      <div className={styles.root}>
        <button disabled={!logged} className={styles.container} onClick={this.addLike}>
          {this.renderHeart()}
        </button>
        {this.renderUsers(likes)}
        <Modal
          open={modal}
          classNames={{
            overlay: styles.customOverlay,
            modal: styles.customModal,
          }}
          onClose={this.modalClose}
        >
          {this.renderUserList(likes)}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.userReducer.logged,
  userUid: state.userReducer.userUid,
  username: state.userReducer.username,
});

// LikesCounter.propTypes = {
//   loaded: PropTypes.bool.isRequired,
//   blogLoaded: PropTypes.func.isRequired,
// };

export default connect(
  mapStateToProps,
  { loginModalOpen },
)(LikesCounter);
