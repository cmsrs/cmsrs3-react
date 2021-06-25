import React, { Component } from 'react';
import requireAuth from './requireAuth';
import Clearcache from './settings/Clearcache';
import Createsitemap from './settings/Createsitemap';
import { connect } from 'react-redux';
import * as actions from '../actions/products'; //?
import Header from './Header';

class Settings extends Component {

  render() {
    return (
      <div>
      <Header />
      <div  className="mt-3  container">
        <h2 className="mb-3">Settings</h2>
        <br/>
        <Clearcache />
        <br/>
        <Createsitemap />
      </div>
      </div>
    );
  }
}

export default connect(null, actions)(requireAuth(Settings));
