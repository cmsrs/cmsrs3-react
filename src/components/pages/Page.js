import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Page extends Component {

  render() {
    return (
      <div>
        ________Page_____________
      </div>
    );
  }
}

export default connect(null, actions)(Page);
