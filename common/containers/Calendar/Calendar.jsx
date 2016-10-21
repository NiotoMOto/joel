import React, { Component } from 'react';

import { connect } from '../../services/util';
import Layout from '../../components/Layout';

@connect({ props: ['currentWeek', 'users'] })
export default class Calendar extends Component {
  render() {
    return (
      <Layout>
        <h2>Semaine {this.props.currentWeek}</h2>
      </Layout>
    );
  }
}
