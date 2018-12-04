import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { changeTag } from 'actions/blogActions';
import styles from './TopTitle.module.css';
import Routes from '../../lib/routes';

const NAVIGATION_BAR = [
  {
    label: 'BLOG',
    link: Routes.rootPath,
  },
  {
    label: 'ABOUT',
    link: Routes.aboutPath,
  },
];

class TopTitle extends Component {
  state = {
    page: '',
  };

  componentDidMount() {
    console.log(this.props.path);
    this.setState({
      page: this.props.location.pathname,
    });
  }

  clearTag = () => this.props.changeTag('');

  renderTitle = () => {
    const { page } = this.state;
    switch (page) {
      case Routes.rootPath:
        return 'BLOG';
      case Routes.aboutPath:
        return 'ABOUT';
      default:
        return 'BLOG';
    }
  };

  renderSubTitle = () => {
    const { page } = this.state;
    const { tag } = this.props;
    switch (page) {
      case Routes.rootPath:
        return tag === '' ? (
          ''
        ) : (
          <div className={styles.tag} onClick={this.clearTag}>
            #{tag}
          </div>
        );
      case Routes.aboutPath:
        return 'me, patchnotes, todo, links';
      default:
        return '';
    }
  };
  render() {
    return (
      <div className={styles.root}>
        <h1 className={styles.pageTitle}>{this.renderTitle()}</h1>
        <h3 onClick={this.clearTag} className={styles.sub}>
          {this.renderSubTitle()}
        </h3>
        <nav className={styles.nav}>
          {NAVIGATION_BAR.map(elem => (
            <NavLink exact className={styles.link} key={elem.link} to={elem.link}>
              {elem.label}
            </NavLink>
          ))}
        </nav>
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
