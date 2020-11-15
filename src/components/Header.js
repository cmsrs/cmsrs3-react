import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ADMIN_URL_SECRET } from '../config';

class Header extends Component {

  renderLinks() {
    const urlPages = "/admin"+ADMIN_URL_SECRET+"/pages";
    const urlUsers = "/admin"+ADMIN_URL_SECRET+"/users";
    const urlProducts = "/admin"+ADMIN_URL_SECRET+"/products";
    const urlSignout = "/admin"+ADMIN_URL_SECRET+"/signout";
    const urlContacts = "/admin"+ADMIN_URL_SECRET+"/contacts";

    if (this.props.authenticated) {
      return (
        <div className="container-fluid">
          <div className="container">
            <Link   to={urlPages}>Pages</Link>
            <Link  className="ml-4"  to={urlUsers}>Users</Link>
            <Link  className="ml-4"  to={urlProducts}>Products</Link>
            <Link  className="ml-4"  to={urlContacts}>Contacts</Link>
          </div>
          <Link   to={urlSignout}>Sign Out</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {this.renderLinks()}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
