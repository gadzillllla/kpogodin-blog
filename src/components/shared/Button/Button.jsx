import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ label, onClick, disabled, danger, ghost, type }) => {
  const buttonStyle = cn(styles.primary, { [styles.ghost]: ghost, [styles.danger]: danger });
  return (
    <button className={buttonStyle} type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  danger: PropTypes.bool,
  ghost: PropTypes.bool,
  type: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  label: 'BUTTON',
  danger: false,
  ghost: false,
  type: 'button',
};
