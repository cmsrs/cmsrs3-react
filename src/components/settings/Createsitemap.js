import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/settings';

class Createsitemap extends Component {

  createSitemap = () => {
    this.props.getClearcache( () => {
      alert('Success: create sitemap');
    });
  }

  render() {
    return (
        <div>
          <div className="ml-2 trash"  onClick={this.createSitemap}><i className="fas fa-cog  cursor-pointer"  aria-hidden="true"/> Create sitemap </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkouts: state.checkouts,
    checkoutsRes: state.checkouts.checkouts_res
  };
}

export default connect(mapStateToProps, actions)(Createsitemap);
