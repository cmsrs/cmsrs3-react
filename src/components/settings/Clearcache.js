import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/settings';

class Clearcache extends Component {


  clearCache = () => {
    this.props.getClearcache( () => {
      alert('Success: clear Cache');
    });

  }

  render() {
    return (
        <div>
          <div className="ml-2 trash"  onClick={this.clearCache}><i className="fas fa-cog  cursor-pointer"  aria-hidden="true"/> Clear cache </div>
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

export default connect(mapStateToProps, actions)(Clearcache);
