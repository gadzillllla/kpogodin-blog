import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from 'components/LoginForm';
import Routes from 'lib/routes';
import styles from './Header.module.css';

const renderHeader = () => (
  <header className={styles.root}>
    <div className={styles.container}>
      <h5 className={styles.logo}>
        <NavLink className={styles.link} to="/">
          <b>KPOGODIN</b> blog
        </NavLink>
      </h5>
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
