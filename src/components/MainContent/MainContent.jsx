import React, { Component } from 'react';
import { connect } from 'react-redux';
import { databasePosts, appDB } from 'DBconfig/DB_CONFIG';
import Post from 'components/shared/Post';
import Loader from 'components/shared/Loader';
import PropTypes from 'prop-types';
import { blogLoaded, blogLoading } from 'actions/blogActions';
import AddPostForm from 'components/AddPostForm';

class MainContent extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    const { posts } = this.state;
    const { blogLoaded } = this.props;
    const previousPosts = posts;
    databasePosts.on('child_added', snap => {
      previousPosts.push({
        id: snap.key,
        txt: snap.val().txt,
        title: snap.val().title,
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

  render() {
    const { posts } = this.state;
    const { loaded } = this.props;
    if (!loaded) {
      return <Loader />;
    }
    return (
      <div>
        <AddPostForm />
        {posts.map(elem => (
          <Post title={elem.title} text={elem.txt} key={elem.id} postId={elem.id} comments={elem.comments} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loaded: state.blogReducer.loaded,
});

MainContent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  blogLoaded: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { blogLoaded, blogLoading },
)(MainContent);
