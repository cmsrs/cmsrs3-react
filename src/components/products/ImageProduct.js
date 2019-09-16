import React, { Component } from 'react';
//import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/products';
import {SERVER_URL} from '../../config';

class ImageProduct extends Component {

  delImage = () => {
    this.props.delImage(this.props.data.id, () => {
      this.props.getProducts( (products) => {
        const product = this.getDataFromProps(products, this.props.productId);
        this.props.setProduct(product);

      });
    });
  }

  getDataFromProps = (products, id) => {
    const  data = products.filter( product => {
      return product.id === parseInt(id);
    });

    if(!data.length){
      return {};
    }
    return data[0];
  }


  render() {

    return (
      <div className="ml-1  mt-3 row">
        <img  src={SERVER_URL + this.props.data.fs.small}   alt={this.props.data.name}/>

        <div className="trash ml-2"  onClick={this.delImage}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>

      </div>
    )
  }
}


//export default connect(null, actions)(requireAuth(Image));
export default connect(null, actions)(ImageProduct);
