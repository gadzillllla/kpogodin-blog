import React, { Component } from 'react';
import { connect } from 'react-redux';
import { databasePosts } from 'DBconfig/DB_CONFIG';
import Post from 'components/shared/Post';
import Loader from 'components/shared/Loader';
import PropTypes from 'prop-types';
import { blogLoaded, blogLoading } from '../../actions/blogActions';

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
        author: snap.val().author,
        time: snap.val().time,
      });
      this.setState(
        {
          posts: previousPosts,
        },
        blogLoaded,
      );
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
        {posts.map(elem => (
          <Post date={elem.time} author={elem.author} text={elem.txt} key={elem.id} postId={elem.id} />
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
