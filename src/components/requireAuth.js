import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ADMIN_URL_SECRET } from '../config';
//import { Redirect } from 'react-router-dom'

export default ChildComponent => {
  class ComposedComponent extends Component {

    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        const urlAmin  = '/admin'+ADMIN_URL_SECRET+'/';
        this.props.history.push(urlAmin);
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
