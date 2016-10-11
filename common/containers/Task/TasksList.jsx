
'use strict';

import React, { Component, PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { FlatButton, FloatingActionButton } from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from '../../services/util';
import Layout from '../../components/Layout';

@connect({ props: ['tasks', 'totalCount'] })
export default class TasksList extends Component {
  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    tasks: PropTypes.array.isRequired,
  };

  renderFooter() {
    return (
      <FloatingActionButton
        className="pull-right"
        href="/tasks/new"
      >
        <ContentAdd />
      </FloatingActionButton>
    );
  }

  render() {
    const tasks = this.props.tasks.map((p) => (
      <TableRow key={p._id}>
        <TableRowColumn>
          {p.user ?
            `${p.user.firstName} ${p.user.lastName}` :
             (<span>Non attribué</span>)}
        </TableRowColumn>
        <TableRowColumn>
        {p.project ?
           p.project.name :
           (<span>Pas de projet</span>)}
        </TableRowColumn>
        <TableRowColumn>
          {p.name}
        </TableRowColumn>
      </TableRow>
    ));
    return (
      <Layout footer={this.renderFooter()}>
        <h1>Liste des tâches </h1>
        <Table className="row">
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Technicien</TableHeaderColumn>
              <TableHeaderColumn>Projet</TableHeaderColumn>
              <TableHeaderColumn>Réalisation</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {tasks}
          </TableBody>
        </Table>
      </Layout>
    );
  }
}
