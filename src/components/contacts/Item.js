import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/contacts';

class Item extends Component {

  constructor(props) {
    super(props);
    this.data =  this.props.data;
  }

  delItem = () => {
    this.props.deleteContact(this.data.id);
  }

  render() {

    return (
      <tr>
        <td>{this.data.email}</td>
        <td>{this.data.message}</td>
        <td>{this.data.created_at_format}</td>
        <td>
          <div className="ml-2 trash"  onClick={this.delItem}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>
        </td>
      </tr>
    );
  }

}

function mapStateToProps(state) {
  return {
    contacts: state.contacts,
    contactsRes: state.contacts.contacts_res
  };
}

export default connect(mapStateToProps, actions)(Item);
