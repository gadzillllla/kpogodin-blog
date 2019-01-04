import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Hamburger from 'components/Hamburger';
import LoginForm from 'components/LoginForm';
import { Icon } from 'antd';
import { isMobile } from 'lib/browser';
import styles from './Header.module.css';

const renderLogo = () => (isMobile() ? <Icon type="home" style={{ fontSize: '25px', color: 'black' }} /> : <p>desc</p>);

const renderHeader = () => (
  <header className={styles.root}>
    <div className={styles.container}>
      <div className={styles.logo}>
        <Hamburger />
      </div>
      <LoginForm />
    </div>
  </header>
);

const Header = ({ loaded }) => loaded && renderHeader();

const mapStateToProps = state => ({
  loaded: state.blogReducer.loaded,
});

// MainContent.propTypes = {
//   loaded: PropTypes.bool.isRequired,
//   blogLoaded: PropTypes.func.isRequired,
// };

export default connect(
  mapStateToProps,
  {},
)(Header);
