import React from 'react';
import { connect } from 'react-redux';
import Hamburger from 'components/Hamburger';
import CurrentUser from 'components/CurrentUser';
import { changeTag } from 'actions/blogActions';
import styles from './Header.module.css';

const Header = props => {
  const clearTag = () => props.changeTag('');

  const renderSubTitle = () =>
    props.tag && (
      <div className={styles.tag} onClick={clearTag}>
        #{props.tag}
      </div>
    );

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <Hamburger />
        {renderSubTitle()}
        <div className={styles.right}>
          <CurrentUser />
        </div>
      </div>
    </header>
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
)(Header);
