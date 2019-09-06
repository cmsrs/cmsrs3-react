import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/users';
import Expire from '../../helpers/Expire';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Clients extends Component {

  componentDidMount() {
    this.props.getClients();
  }

  render() {

    const { clients } = this.props;

    let msg = '';
    if(this.props.usersRes && (this.props.usersRes.success  === false)  ){
      msg = <Expire  delay={5000}><div className="alert alert-danger" role="alert">{JSON.stringify(this.props.usersRes.message, null, 2)}</div></Expire>;
    }

    if(this.props.usersRes && (this.props.usersRes.success === true) ){
      msg = <Expire  delay={5000}><div className="alert alert-success" role="alert">{JSON.stringify(this.props.usersRes.message, null, 2)}</div></Expire>;
    }

    return (
      <div className="mt-3 mb-2">
        <div className="wrapMsg">
        {msg}
        </div>
        <div className="row">

          <BootstrapTable data={ clients }>
            <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Client Name</TableHeaderColumn>
            <TableHeaderColumn dataField='email'>Client Email</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    clients: state.users.clients,
    usersRes: state.users.users_res
  };
}

export default connect(mapStateToProps, actions)(Clients);
