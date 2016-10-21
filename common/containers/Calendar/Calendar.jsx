import React, { Component } from 'react';

import { connect } from '../../services/util';
import Layout from '../../components/Layout';
import Calendar from '../../components/calendar';

@connect({ props: ['currentWeek', 'users'] })
export default class CalendarC extends Component {
  render() {
    return (
      <Layout>
        <h2>Semaine {this.props.currentWeek}</h2>
        <Calendar />
      </Layout>
    );
  }
}
