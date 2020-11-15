import React, { Component } from 'react';
import requireAuth from './requireAuth';
import { connect } from 'react-redux';
import Contact from './contacts/Contact';
import * as actions from '../actions/contacts';
import Header from './Header';

class Contacts extends Component {


  render() {
    return (
      <div>
      <Header />
      <div  className="mt-3  container">
        <h2 className="mb-3">Contacts</h2>
        <Contact />
      </div>
      </div>
    );
  }
}

export default connect(null, actions)(requireAuth(Contacts));
