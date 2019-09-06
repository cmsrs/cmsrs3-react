import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div className="container-fluid">
          <div className="container">
            <Link   to="/admin/pages">Pages</Link>
            <Link  className="ml-4"  to="/admin/users">Users</Link>
          </div>
          <Link   to="/admin/signout">Sign Out</Link>
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
