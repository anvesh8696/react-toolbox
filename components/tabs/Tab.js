import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { FontIcon } from '../font_icon';
import { themr } from 'react-css-themr';
import { TABS } from '../identifiers.js';

class Tab extends Component {
  static propTypes = {
    active: PropTypes.bool,
    activeClassName: PropTypes.string,
    ariakey: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    hidden: PropTypes.bool,
    icon: PropTypes.node,
    label: PropTypes.node,
    onActive: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    theme: PropTypes.shape({
      active: PropTypes.string,
      disabled: PropTypes.string,
      hidden: PropTypes.string,
      label: PropTypes.string
    })
  };

  static defaultProps = {
    active: false,
    ariakey: '',
    className: '',
    disabled: false,
    hidden: false
  };

  componentDidUpdate (prevProps) {
    if (!prevProps.active && this.props.active && this.props.onActive) {
      this.props.onActive();
    }
  }

  handleClick = (event) => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleKeyDown = (event) => {
    if (!this.props.disabled && this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  }

  render () {
    const {
      onActive, // eslint-disable-line
      active, activeClassName, ariakey, className, disabled, hidden, label, icon, theme, ...other
    } = this.props;
    const _className = classnames(theme.label, {
      [theme.active]: active,
      [theme.hidden]: hidden,
      [theme.withText]: label,
      [theme.withIcon]: icon,
      [theme.disabled]: disabled,
      [activeClassName]: active
    }, className);
    const aria = {
      'aria-controls': active ? ariakey.replace('_tab_', '_panel_') : null,
      'aria-selected': active.toString(),
      'id': ariakey,
      'role': 'tab',
      'tabIndex': active ? 0 : -1
    };
    return (
      <label {...other} {...aria} data-react-toolbox='tab' className={_className} onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
        {icon && <FontIcon className={theme.icon} value={icon}/>}
        {label}
      </label>
    );
  }
}

export default themr(TABS)(Tab);
export { Tab };
