import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        this.props.history.push('/');
        //return <Redirect to='/' />
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
