import React from 'react';
import { Link } from 'react-router-dom';
import Routes from 'lib/routes';
import Logo from '../shared/logo.svg';
import styles from './Header.module.scss';

const NAVIGATION_BAR = [
  {
    label: 'blog',
    link: Routes.rootPath,
  },
  {
    label: 'video',
    link: Routes.videoPath,
  },
  {
    label: 'about',
    link: Routes.aboutPath,
  },
];

const Header = () => (
  <header className={styles.container}>
    <Logo className={styles.logo} />
    <nav className={styles.navigation}>
      {NAVIGATION_BAR.map(elem => (
        <Link key={elem.link} className={styles.link} to={elem.link}>
          <p>{elem.label}</p>
        </Link>
      ))}
    </nav>
  </header>
);

export default Header;
