import React, { Component } from 'react';
//import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/products';
//import {changePosition} from '../../actions/pages';
import {SERVER_URL} from '../../config';
import { getImageById, changeItemInArr } from '../../helpers/pages';

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

  downImage = () => {
    this.props.changePosition('down', this.props.data.id, 'images', () => {
      this.props.getProducts( (products) => {
        const product = this.getDataFromProps(products, this.props.productId);
        this.props.setProduct(product);
      });
    });
  }

  upImage = () => {
    this.props.changePosition('up', this.props.data.id, 'images', () => {
      this.props.getProducts( (products) => {
        const product = this.getDataFromProps(products, this.props.productId);
        this.props.setProduct(product);
      });
    });
  }

  handleChange = (event) => {
    let image = getImageById(this.props.product.images, this.props.data.id);
    image.alt = event.target.value;

    let images = changeItemInArr(this.props.product.images, image);
    let newProductData = { ...this.props.product, 'images': images};

    this.props.changeProduct(newProductData);
  }

  render() {
    let image = getImageById(this.props.product.images, this.props.data.id);

    return (
      <div className="ml-1  mt-3 row">
        <img  src={SERVER_URL + image.fs.small} alt={image.alt} />

        <div className="ml-1 row">
          <div className="trash ml-2"  onClick={this.delImage}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>

          {(this.props.product.images.length > 1) &&
          <React.Fragment>
            <div className="ml-2"  onClick={this.downImage}><i className="fas fa-arrow-down cursor-pointer"></i></div>
            <div className="ml-2"  onClick={this.upImage}><i className="fas fa-arrow-up cursor-pointer"></i></div>
          </React.Fragment>
          }

          <input type="text" placeholder="Short title" name="short_title" className="form-control col"
               onChange={this.handleChange} value={image.alt || ''} />

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.products.product
  };
}

//export default connect(null, actions)(requireAuth(Image));
export default connect(mapStateToProps, actions)(ImageProduct);
