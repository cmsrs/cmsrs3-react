import React, { Component } from 'react';
import requireAuth from './requireAuth';
import Clients from './users/Clients';
import { connect } from 'react-redux';
import * as actions from '../actions/users';

class Users extends Component {


  render() {
    return (
      <div  className="mt-3  container">
        <h2 className="mb-3">Users</h2>
        <Clients />
      </div>
    );
  }
}

export default connect(null, actions)(requireAuth(Users));
