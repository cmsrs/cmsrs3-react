import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ADMIN_URL_SECRET, MENU_VISIBLE } from '../config';

class Header extends Component {

  renderLinks() {
    const urlPages = "/admin"+ADMIN_URL_SECRET+"/pages";
    const urlUsers = "/admin"+ADMIN_URL_SECRET+"/users";
    const urlProducts = "/admin"+ADMIN_URL_SECRET+"/products";
    const urlSignout = "/admin"+ADMIN_URL_SECRET+"/signout";
    const urlContacts = "/admin"+ADMIN_URL_SECRET+"/contacts";
    const urlCheckouts = "/admin"+ADMIN_URL_SECRET+"/checkouts";
    const urlSettings = "/admin"+ADMIN_URL_SECRET+"/settings";

    if (this.props.authenticated) {
      return (
        <div className="container-fluid">
          <div className="container">
            {(MENU_VISIBLE.includes('pages')) &&
            <React.Fragment>
              <Link   to={urlPages}>Pages</Link>
            </React.Fragment>
            }
            {(MENU_VISIBLE.includes('users')) &&
            <React.Fragment>
              <Link  className="ml-4"  to={urlUsers}>Users</Link>
            </React.Fragment>
            }
            {(MENU_VISIBLE.includes('products')) &&
            <React.Fragment>
              <Link  className="ml-4"  to={urlProducts}>Products</Link>
            </React.Fragment>
            }
            {(MENU_VISIBLE.includes('checkouts')) &&
            <React.Fragment>
              <Link  className="ml-4"  to={urlCheckouts}>Checkouts</Link>
            </React.Fragment>
            }
            {(MENU_VISIBLE.includes('contacts')) &&
            <React.Fragment>
              <Link  className="ml-4"  to={urlContacts}>Contacts</Link>
            </React.Fragment>
            }
            {(MENU_VISIBLE.includes('settings')) &&
            <React.Fragment>
              <Link  className="ml-4"  to={urlSettings}>Settings</Link>
            </React.Fragment>
            }
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
