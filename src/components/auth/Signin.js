import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { ADMIN_URL_SECRET } from '../../config';
//import { Redirect } from 'react-router-dom'

class Signin extends Component {

  componentDidMount() {
    if (this.props.auth) {
      const urlPages = "/admin"+ADMIN_URL_SECRET+"/pages";
      this.props.history.push(urlPages);
    }
  }

  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      const urlPages = "/admin"+ADMIN_URL_SECRET+"/pages";
      return this.props.history.push(urlPages);
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="container mt-4"  onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset  className="col-4 form-group">
          <label>Email</label>
          <Field
            className="form-control  mb-2"
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <fieldset  className="col-4  form-group">
          <label>Password</label>
          <Field
            className="form-control  mb-2"
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button className="btn btn-primary mt-2 mr-sm-2" >Sign In!</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage, auth: state.auth.authenticated };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(Signin);
