import React, { Component } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import cn from 'classnames';
import styles from './Hamburger.module.css';
import { NavLink } from 'react-router-dom';
import Routes from '../../lib/routes';
import { divide } from 'ramda';

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

class Hamburger extends Component {
  state = {
    open: false,
  };

  handleClick = () =>
    this.setState({
      open: !this.state.open,
    });

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.button}>
          <HamburgerMenu
            isOpen={this.state.open}
            menuClicked={this.handleClick}
            width={30}
            height={20}
            strokeWidth={2}
            rotate={0}
            color="black"
            borderRadius={0}
            animationDuration={0.1}
          />
        </div>
        <div className={cn(styles.nav, { [styles.hide]: !this.state.open })}>
          <nav className={styles.menu}>
            {NAVIGATION_BAR.map(elem => {
              return (
                <NavLink exact key={elem.link} className={styles.link} onClick={this.handleClick} to={elem.link}>
                  <div>{elem.label}</div>
                </NavLink>
              );
            })}
          </nav>
          <div onClick={this.handleClick} className={cn(styles.background)} />
        </div>
      </div>
    );
  }
}

export default Hamburger;
