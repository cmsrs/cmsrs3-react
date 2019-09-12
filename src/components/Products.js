import React, { Component } from 'react';
import requireAuth from './requireAuth';
import Product from './products/Product';
import { connect } from 'react-redux';
import * as actions from '../actions/products';

class Products extends Component {


  render() {
    return (
      <div  className="mt-3  container">
        <h2 className="mb-3">Products</h2>
        <Product />
      </div>
    );
  }
}

export default connect(null, actions)(requireAuth(Products));
