
'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { Chip } from 'material-ui';

import { connect } from '../../services/util';

@connect({ props: ['tasks', 'totalCount'] })
export default class TasksTable extends Component {
  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    tasks: PropTypes.array.isRequired,
  };

  render() {
    const tasks = this.props.tasks.map((p) => (
      <TableRow
        key={p._id}
      >
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
          <a href={`/tasks/${p._id}`}> {p.name} </a>
        </TableRowColumn>
        <TableRowColumn>
          {p.timePass} h
        </TableRowColumn>
        <TableRowColumn>
          <Chip style={{ textAlign: 'center' }}>{p.progress} %</Chip>
        </TableRowColumn>
      </TableRow>
    ));
    return (
      <Table className="row">
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Technicien</TableHeaderColumn>
            <TableHeaderColumn>Projet</TableHeaderColumn>
            <TableHeaderColumn>Réalisation</TableHeaderColumn>
            <TableHeaderColumn>Temps passé</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {tasks}
        </TableBody>
      </Table>
    );
  }
}
