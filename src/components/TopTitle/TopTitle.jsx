import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeTag } from 'actions/blogActions';
import styles from './TopTitle.module.css';

class TopTitle extends Component {
  render() {
    return (
      <div className={styles.root}>
        <img className={styles.ava} src="https://avatars1.githubusercontent.com/u/37631833?s=460&v=4" />
        <h1 className={styles.pageTitle}>{this.props.title}</h1>
      </div>
    );
  }
}

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
