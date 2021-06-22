import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/checkouts';

class Item extends Component {

  constructor(props) {
    super(props);
    this.data =  this.props.data;

    this.state = {
      isPay : this.data.is_pay
    };

  }

  isPay = ( checkoutId ) => {
    this.props.updateCheckout(checkoutId, () => {
      this.setState({isPay: 1});
    });
  }

  render() {
    return (
      <tr>
        <td>{this.data.email}</td>
        <td>{this.data.telephone}</td>
        <td>{this.data.id}</td>
        <td className="text-right">
          <strong>{this.data.price_total_add_deliver} zł</strong>
        </td>
        <td className="text-right">
          {this.data.price_total} zł
        </td>
        <td className="text-right">
          {this.data.price_deliver} zł
        </td>
        <td>
          {this.data.baskets.map(basket =>
            <div className="text-nowrap"  key={basket.product_id}><a rel="noopener noreferrer" target="_blank" href={basket.product_url}>{basket.product_name}</a> {basket.qty} x {basket.price} zł</div>
          )}
        </td>
        <td>{this.data.created_at.split('.')[0].replace('T', ' ') }</td>
        <td>
          {!this.state.isPay ?
          <React.Fragment>
            <div className="ml-2 trash"  onClick={this.isPay.bind(this, this.data.id)}><i className="far fa-money-bill-alt  cursor-pointer"  aria-hidden="true"/></div>
          </React.Fragment> : 'Paid'
          }
        </td>
      </tr>
    );
  }
}

function mapStateToProps(state) {
  return {
    checkouts: state.checkouts,
    checkoutsRes: state.checkouts.checkouts_res
  };
}

export default connect(mapStateToProps, actions)(Item);
