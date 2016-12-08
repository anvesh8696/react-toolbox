import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TABS } from '../identifiers.js';

class TabContent extends Component {
  static propTypes = {
    active: PropTypes.bool,
    ariakey: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    tabIndex: PropTypes.number,
    theme: PropTypes.shape({
      active: PropTypes.string,
      tab: PropTypes.string
    })
  };

  static defaultProps = {
    active: false,
    ariakey: '',
    className: ''
  };

  render () {
    const className = classnames(this.props.theme.tab, {
      [this.props.theme.active]: this.props.active
    }, this.props.className);
    const {active, ariakey, tabIndex} = this.props;
    const aria = {
      'aria-labelledby': active ? ariakey.replace('_panel_', '_tab_') : null,
      'aria-hidden': active.toString(),
      'id': ariakey,
      'role': 'tabpanel'
    };
    return (
      <section {...aria} className={className} tabIndex={tabIndex}>
        {this.props.children}
      </section>
    );
  }
}

export default themr(TABS)(TabContent);
export { TabContent };
