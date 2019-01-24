import React, { Component } from 'react';
import { connect } from 'react-redux';
import { databasePosts, storage } from 'DBconfig/DB_CONFIG';
import Post from 'components/shared/Post';
import Loader from 'components/shared/Loader';
import PropTypes from 'prop-types';
import UploadFile from 'components/UploadFile';
import TopTitle from 'components/TopTitle';
import { blogLoaded, blogLoading } from 'actions/blogActions';
import { sortObjByKey, filterPostByTags, stringToTags } from 'lib/utils';
import { withRouter } from 'react-router';
import styles from './MainContent.module.css';

class MainContent extends Component {
  state = {
    posts: [],
    image: null,
    url: '',
    progress: 0,
  };

  componentDidMount() {
    const { location } = this.props;
    const { posts } = this.state;
    const { blogLoaded } = this.props;
    const previousPosts = posts;
    databasePosts.on('child_added', snap => {
      previousPosts.push({
        id: snap.key,
        txt: snap.val().txt,
        title: snap.val().title,
        time: snap.val().time,
        tags: snap.val().tags,
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
    const { loaded, selectedTag } = this.props;
    if (!loaded) {
      return <Loader />;
    }
    return (
      <div className={styles.root}>
        <TopTitle title="KPOGODIN BLOG" />
        <UploadFile
          percent={69}
          url="https://firebasestorage.googleapis.com/v0/b/kpogodin-blog73.appspot.com/o/images%2F1545392906856-%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202018-12-13%20%D0%B2%2015.20.04.png?alt=media&amp;token=fc7c255b-bc16-4f21-942a-358bbf427e66"
        />
        <div className={styles.content}>
          {filterPostByTags(sortObjByKey(posts.slice(), 'time'), selectedTag).map(elem => (
            <Post
              title={elem.title}
              text={elem.txt}
              key={elem.id}
              postId={elem.id}
              time={elem.time}
              tags={stringToTags(elem.tags)}
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
  selectedTag: state.blogReducer.tag,
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

{
  /* <img class="UploadFile_img__3F2el" src="https://firebasestorage.googleapis.com/v0/b/kpogodin-blog73.appspot.com/o/images%2F1545392906856-%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202018-12-13%20%D0%B2%2015.20.04.png?alt=media&amp;token=fc7c255b-bc16-4f21-942a-358bbf427e66"></img> */
}
