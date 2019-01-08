import React, { Component } from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import cn from 'classnames';
import { connect } from 'react-redux';
import styles from './Hamburger.module.css';
import { NavLink } from 'react-router-dom';
import Routes from '../../lib/routes';
import Button from 'components/shared/Button';
import Avatar from 'components/shared/Avatar';
import CurrentUser from 'components/CurrentUser';
import { userLogout, loginModalOpen } from 'actions/userActions';
import { logout } from 'DBconfig/DB_CONFIG';

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

  userLogout = () => {
    logout();
    this.props.userLogout();
    this.handleClick();
  };

  renderUserInfo = () => {
    const { username, logged, userPicUrl, loginModalOpen } = this.props;
    if (username && logged)
      return (
        <div className={styles.userInfo}>
          <Button label="ВЫЙТИ" ghost onClick={this.userLogout} />
          {/* <div className={styles.userBlock}>
            <Avatar userPicUrl={userPicUrl} size={25} />
            <p>{username}</p>
          </div> */}
          <CurrentUser />
        </div>
      );
    return (
      <div className={styles.userInfo}>
        <Button onClick={loginModalOpen} ghost label="ВОЙТИ" />
      </div>
    );
  };

  renderEditorLink = () =>
    this.props.admin && (
      <NavLink to={Routes.postEditor} onClick={this.handleClick} className={styles.link}>
        <div>ADD POST</div>
      </NavLink>
    );

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
            {this.renderUserInfo()}
            {this.renderEditorLink()}
          </nav>
          <div onClick={this.handleClick} className={cn(styles.background)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged: state.userReducer.logged,
  username: state.userReducer.username,
  userPicUrl: state.userReducer.userPicUrl,
  admin: state.userReducer.admin,
});

// LoginForm.propTypes = {
//   username: PropTypes.string.isRequired,
// };

export default connect(
  mapStateToProps,
  { userLogout, loginModalOpen },
)(Hamburger);
