import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from 'components/LoginForm';
import Routes from 'lib/routes';
import styles from './Header.module.css';
import LogoSvg from 'components/shared/SVG/logo';

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
    <LogoSvg />
    <nav className={styles.navigation}>
      {NAVIGATION_BAR.map(elem => (
        <Link key={elem.link} className={styles.link} to={elem.link}>
          <p>{elem.label}</p>
        </Link>
      ))}
    </nav>
    <LoginForm />
  </header>
);

export default Header;
