import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  onSubmit =  formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push('/pages');
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
        <button className="btn btn-secondary mt-2 mr-sm-2" >Sign Up!</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(Signup);
