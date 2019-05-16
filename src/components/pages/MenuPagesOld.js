import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form'
import * as actions from '../../actions';
import validate from './validate';
import { connect } from 'react-redux';
import { compose } from 'redux';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

/*
const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Hobby
      </button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
)
*/

const renderPages = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Page
      </button>

      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />

        <h4>Page #{index + 1}</h4>
        <Field
          name={`${member}.title`}
          type="text"
          component={renderField}
          label="Title"
        />
        <Field
          name={`${member}.short_title`}
          type="text"
          component={renderField}
          label="Short title"
        />
      </li>
    ))}
  </ul>
)


class MenuPages extends Component {

  onSubmit = formProps => {
    console.log(formProps);
  };

  render() {
    const { handleSubmit, submitting } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Menu name"
        />
        <Field
          name="position"
          type="text"
          component={renderField}
          label="Menu position"
        />

        <FieldArray name="pages" component={renderPages} />
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </div>
      </form>
    )
  }
}


//export default connect(null, actions)(MenuPages);


export default compose(
  connect(null, actions),
  reduxForm({ form: 'menuPageForm', validate })
)(MenuPages);
