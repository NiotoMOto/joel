'use strict';

import React, { Component } from 'react';
import Layout from '../components/Layout';
import { connect } from '../services/util';

@connect({ props: ['users'], actions: ['users'] })
export default class Home extends Component {
  render() {
    return (
      <Layout title="Photos stock">
        <form action="/upload/image" encType="multipart/form-data" method="POST" >
          Select an image to upload:
          <input name="image" type="file" />
          <input type="submit" value="Upload Image" />
        </form>
      </Layout>
    );
  }
}
