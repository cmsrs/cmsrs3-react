import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/contacts';
import Expire from '../../helpers/Expire';

class Item extends Component {

  componentDidMount() {
    this.props.getContacts( (d) => {
      //console.log(d);
    });
  }


  render() {


    return (
      <div className="mt-3 mb-2  container">
        <div className="row">
          test123
        </div>
      </div>
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
