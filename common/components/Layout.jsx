'use strict';

import React, { PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const { Component } = React;

const darkMuiTheme = getMuiTheme(
  {
    userAgent: 'all',
  }
);

export default class Layout extends Component {
  static propTypes = {
    footer: PropTypes.element,
  }

  constructor(props) {
    super(props);
    this.handleNav = this.handleNav.bind(this);
  }

  state = {
    open: false,
  }

  handleNav() {
    const newValue = !this.state.open;
    this.setState({
      open: newValue,
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div className={`page ${this.state.open ? 'nav-open' : 'nav-close'}`}>
          <h1>{this.props.title}</h1>
          <div className="main-container">
            {this.props.children}
          </div>
          <div className="row footer">
            {this.props.footer}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
