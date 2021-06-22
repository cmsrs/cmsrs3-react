import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/checkouts';
import Expire from '../../helpers/Expire';
import Item from './Item';

class Checkout extends Component {

  componentDidMount() {
    this.props.getCheckouts( (d) => {
    });
  }

  showItems = (checkouts) => {

      let ret = '';
      if(Array.isArray(checkouts)){

        ret = checkouts.map(function(item, index){
          return  <Item key={item.id} data={item}/>
        });
      }


      return ret;
  }

  render() {

    let checkouts = this.props.checkouts.checkouts;

    let msg = '';
    if(this.props.checkoutsRes && (this.props.checkoutsRes.success  === false)  ){
      msg = <Expire  delay={5000}><div className="alert alert-danger" role="alert">{JSON.stringify(this.props.checkoutsRes.message, null, 2)}</div></Expire>;
    }

    if(this.props.checkoutsRes && (this.props.checkoutsRes.success === true) ){
      msg = <Expire  delay={5000}><div className="alert alert-success" role="alert">{JSON.stringify(this.props.checkoutsRes.message, null, 2)}</div></Expire>;
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
              <th scope="col">Telephone</th>              
              <th scope="col">No</th>
              <th scope="col">Price total</th>
              <th scope="col">Price basket</th>
              <th scope="col">Price deliver</th>

              <th scope="col">Basket</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.showItems(checkouts)}
          </tbody>
        </table>
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

export default connect(mapStateToProps, actions)(Checkout);
