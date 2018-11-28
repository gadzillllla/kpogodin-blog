import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import { databasePosts, appDB } from 'DBconfig/DB_CONFIG';
import Post from 'components/shared/Post';
import Loader from 'components/shared/Loader';
import PropTypes from 'prop-types';
import Routes from 'lib/routes';
import { blogLoaded, blogLoading } from 'actions/blogActions';
import AddPostForm from 'components/AddPostForm';
import { sortObjByKey } from 'lib/utils';
import { withRouter } from 'react-router';
import styles from './MainContent.module.css';
import PostEditor from 'components/PostEditor';

class MainContent extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    const { editorAvailable, location } = this.props;
    console.log('head', location.pathname);
    const { posts } = this.state;
    const { blogLoaded } = this.props;
    const previousPosts = posts;
    databasePosts.on('child_added', snap => {
      previousPosts.push({
        id: snap.key,
        txt: snap.val().txt,
        title: snap.val().title,
        time: snap.val().time,
      });
      this.setState(
        {
          posts: previousPosts,
        },
        blogLoaded,
      );
      console.log('posts', posts);
    });

    databasePosts.on('child_removed', snap => {
      previousPosts.forEach((elem, index) => {
        if (elem.id === snap.key) {
          previousPosts.splice(index, 1);
        }
      });

      this.setState({
        posts: previousPosts,
      });
    });
  }

  renderEditorLink = () =>
    this.props.admin && (
      <Link to={Routes.postEditor} className={styles.addContainer}>
        <Icon className={styles.addIcon} type="plus-circle" />
      </Link>
    );

  render() {
    const { posts } = this.state;
    const { loaded, match, location, history } = this.props;
    console.log(match, location, history);
    if (!loaded) {
      return <Loader />;
    }
    return (
      <div className={styles.root}>
        <h1 className={styles.pageTitle}>KPOGODIN</h1>
        <div className={styles.content}>
          {this.renderEditorLink()}
          {sortObjByKey(posts.slice(), 'time').map(elem => (
            <Post
              title={elem.title}
              text={elem.txt}
              key={elem.id}
              postId={elem.id}
              time={elem.time}
              comments={elem.comments}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.blogReducer.loaded,
  admin: state.userReducer.admin,
});

MainContent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  blogLoaded: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { blogLoaded, blogLoading },
)(withRouter(MainContent));
