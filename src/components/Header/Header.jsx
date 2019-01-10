import React from 'react';
import Hamburger from 'components/Hamburger';
import CurrentUser from 'components/CurrentUser';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.root}>
    <div className={styles.container}>
      <Hamburger />
      <div className={styles.right}>
        <CurrentUser />
      </div>
    </div>
  </header>
);

export default Header;
