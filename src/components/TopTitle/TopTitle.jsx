import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeTag } from 'actions/blogActions';
import styles from './TopTitle.module.css';
import Routes from '../../lib/routes';

class TopTitle extends Component {
  clearTag = () => this.props.changeTag('');

  renderSubTitle = () => {
    const { tag } = this.props;
    return tag === '' ? (
      ''
    ) : (
      <div className={styles.tag} onClick={this.clearTag}>
        #{tag}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.root}>
        <img className={styles.ava} src="https://avatars1.githubusercontent.com/u/37631833?s=460&v=4" />
        <h1 className={styles.pageTitle}>{this.props.title}</h1>
        <h3 onClick={this.clearTag} className={styles.sub}>
          {this.renderSubTitle()}
        </h3>
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
