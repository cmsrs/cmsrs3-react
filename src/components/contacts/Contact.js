import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/contacts';
import Expire from '../../helpers/Expire';
import Item from './Item';

class Contact extends Component {

  componentDidMount() {
    this.props.getContacts( (d) => {
    });
  }

  showItems = (contacts) => {

      let ret = '';
      if(Array.isArray(contacts)){

        ret = contacts.map(function(item, index){
          return  <Item key={item.id} data={item}/>
        });
      }


      return ret;
  }

  render() {

    let contacts = this.props.contacts.contacts;

    let msg = '';
    if(this.props.contactsRes && (this.props.contactsRes.success  === false)  ){
      msg = <Expire  delay={5000}><div className="alert alert-danger" role="alert">{JSON.stringify(this.props.contactsRes.message, null, 2)}</div></Expire>;
    }

    if(this.props.contactsRes && (this.props.contactsRes.success === true) ){
      msg = <Expire  delay={5000}><div className="alert alert-success" role="alert">{JSON.stringify(this.props.contactsRes.message, null, 2)}</div></Expire>;
    }

    return (
      <div className="mt-3 mb-2">
        <div className="wrapMsg">
          {msg}
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Message</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.showItems(contacts)}
          </tbody>
        </table>
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

export default connect(mapStateToProps, actions)(Contact);
