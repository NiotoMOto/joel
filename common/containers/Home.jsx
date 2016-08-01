'use strict';

import React, { Component } from 'react';
import Layout from '../components/Layout';
import { connect } from '../services/util';

@connect({ props: ['users'], actions: ['users'] })
export default class Home extends Component {
  render() {
    return (
      <Layout title="Photos stock">
        <h1></h1>
      </Layout>
    );
  }
}
