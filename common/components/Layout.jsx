'use strict';

import React, { PropTypes, Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Drawer, AppBar, Menu, MenuItem } from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';
import Work from 'material-ui/svg-icons/action/work';
import ListIcon from 'material-ui/svg-icons/editor/format-list-bulleted';

injectTapEventPlugin();

const darkMuiTheme = getMuiTheme(
  {
    userAgent: 'all',
  }
);

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
              <MenuItem
                href="/tasks"
                primaryText="Tâches"
                rightIcon={<ListIcon />}
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
