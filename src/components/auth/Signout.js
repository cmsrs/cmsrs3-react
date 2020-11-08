import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { ADMIN_URL_SECRET } from '../../config';

class Signout extends Component {
  componentDidMount() {
    this.props.signout( () => {
      const urlAmin  = '/admin'+ADMIN_URL_SECRET+'/';
      this.props.history.push(urlAmin);
    });

  }

  render() {
    return <div>Sorry to see you go</div>;
  }
}

export default connect(null, actions)(Signout);
