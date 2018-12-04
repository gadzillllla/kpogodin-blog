import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeTag } from 'actions/blogActions';
import styles from './TopTitle.module.css';
import Routes from '../../lib/routes';

const TopTitle = props => {
  const clearTag = () => props.changeTag('');

  const renderTitle = () => {
    const { location } = props;
    switch (location.pathname) {
      case Routes.rootPath:
        return 'BLOG';
      case Routes.aboutPath:
        return 'ABOUT';
      default:
        return 'BLOG';
    }
  };

  const renderSubTitle = () => {
    const { location, tag } = props;
    switch (location.pathname) {
      case Routes.rootPath:
        return tag === '' ? (
          ''
        ) : (
          <div className={styles.tag} onClick={clearTag}>
            #{tag}
          </div>
        );
      case Routes.aboutPath:
        return 'me, patchnotes, todo, links';
      default:
        return '';
    }
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.pageTitle}>{renderTitle()}</h1>
      <h3 onClick={clearTag} className={styles.sub}>
        {renderSubTitle()}
      </h3>
    </div>
  );
};

const mapStateToProps = state => ({
  tag: state.blogReducer.tag,
});

// Tag.propTypes = {
//   loaded: PropTypes.bool.isRequired,
//   blogLoaded: PropTypes.func.isRequired,
// };

export default connect(
  mapStateToProps,
  { changeTag },
)(withRouter(TopTitle));
