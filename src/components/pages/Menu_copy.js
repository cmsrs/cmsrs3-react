import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';

class Menu extends Component {
  onSubmit =  formProps => {
    console.log( 'onSubmit',  formProps );
    this.props.saveMenu(formProps);
  };

  render() {
    const { handleSubmit } = this.props;
    console.log('props', this.props);

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <b>menu={this.props.index}</b>
        <fieldset>
          <label>Name</label>
          <Field
            name="name"
            type="text"
            component="input"
          />
        </fieldset>
        <fieldset>
          <label>Position</label>
          <Field
            name="position"
            type="text"
            component="input"
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Save menu!</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'menu', enableReinitialize : true })
)(Menu);






/*

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Menu extends Component {

  render() {
    return (
      <div>
        <i><strong>________Menu_____________</strong></i>
      </div>
    );
  }
}

export default connect(null, actions)(Menu);
*/
