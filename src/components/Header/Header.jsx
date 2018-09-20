import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Routes from '../../lib/routes'

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
    <div className={styles.content}>
        <div className={styles.container}>
            <nav className={styles.navigation}>
                {NAVIGATION_BAR.map(elem => (
                    <Link key={elem.link} className={styles.link} to={elem.link}>
                        {elem.label}
                    </Link>
                ))}
            </nav>
        </div>
    </div>
)



export default Header;