import React, { Component } from 'react';
import requireAuth from './requireAuth';
import MenuPages from './pages/MenuPages';
import { connect } from 'react-redux';
import * as actions from '../actions/pages';
import Header from './Header';

class Pages extends Component {


  render() {
    return (
      <div>
      <Header />
        <div  className="mt-3  container">
          <h2 className="mb-3">CMS - menus and pages</h2>
          <MenuPages />
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(requireAuth(Pages));
