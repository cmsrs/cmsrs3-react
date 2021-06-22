import React, { Component } from 'react';
import requireAuth from './requireAuth';
import Checkout from './checkouts/Checkout';
import { connect } from 'react-redux';
import * as actions from '../actions/products';
import Header from './Header';

class Checkouts extends Component {

  render() {
    return (
      <div>
      <Header />
      <div  className="mt-3  container">
        <h2 className="mb-3">Checkouts</h2>
        <Checkout />
      </div>
      </div>
    );
  }
}

export default connect(null, actions)(requireAuth(Checkouts));
