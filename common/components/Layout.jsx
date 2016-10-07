'use strict';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Drawer, AppBar, Menu, MenuItem } from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';
import Work from 'material-ui/svg-icons/action/work';

injectTapEventPlugin();

const darkMuiTheme = getMuiTheme(
  {
    userAgent: 'all',
  }
);

@connect()
export default class Layout extends Component {
  static propTypes = {
    footer: PropTypes.element,
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={darkMuiTheme}>
        <div>
          <Drawer>
            <AppBar showMenuIconButton={false} title="Projets" />
            <Menu disableAutoFocus>
              <MenuItem
                href="/users"
                primaryText="Utilisateurs"
                rightIcon={<Person />}
                style={{ width: '256px' }}
              />
              <MenuItem
                href="/projects"
                primaryText="Projets"
                rightIcon={<Work />}
                style={{ width: '256px' }}
              />
            </Menu>
          </Drawer>
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
