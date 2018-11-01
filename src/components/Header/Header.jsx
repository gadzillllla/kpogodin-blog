import React from 'react';
import { NavLink } from 'react-router-dom';
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
  <header className={styles.root}>
    <div className={styles.container}>
      <h5 className={styles.logo}>
        <b>KPOGODIN</b> blog
      </h5>
      <div>
        <button>login</button>
      </div>
    </div>
    {/* <LogoSvg /> */}
    {/* <nav className={styles.navigation}>
      {NAVIGATION_BAR.map(elem => (
        <NavLink
          exact
          key={elem.link}
          activeStyle={{ color: 'black', background: 'white' }}
          className={styles.link}
          to={elem.link}
        >
          <p>{elem.label}</p>
        </NavLink>
      ))}
    </nav> */}
    {/* <LoginForm /> */}
  </header>
);

export default Header;
