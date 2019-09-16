import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/products';
import Expire from '../../helpers/Expire';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import AddProduct from './AddProduct';

class Product extends Component {

  componentDidMount() {
    this.props.getProducts( (d) => {      
    });
  }

  handleEditProduct = () =>  {
    if( this.state  && this.state.productsCheck ){
          const data = this.getDataFromProps(this.state.productsCheck);
          this.props.setProduct(data);

        // for(let k in this.state.productsCheck ){
        //   if( this.state.productsCheck[k] === true ){
        //     const data = this.getDataFromProps(k);
        //     this.props.setProduct(data);
        //     break;
        //   }
        // }
    }
    this.refs.table.setState({ selectedRowKeys: [] });

  }

  getDataFromProps = (id) => {
    const  data = this.props.products.filter( product => {
      return product.id === parseInt(id);
    });

    //console.log('id', id);

    if(!data.length){
      return {};
    }
    return data[0];
  }


  handleDeleteProduct = () =>  {
    if( this.state  && this.state.productsCheck ){
      //alert('delete id='+ this.state.productsCheck  );
      this.props.deleteProduct(this.state.productsCheck);
    }
  }

  onRowSelect = (row, isSelected, e) => {

    // let copy = {};
    // if(!this.state  ||  !this.state.productsCheck){
    //   copy[row.id] = isSelected;
    // }else{
    //   let key;
    //
    //   for (key in this.state.productsCheck) {
    //     copy[key] = this.state.productsCheck[key]; // copies each property to the objCopy object
    //   }
    //   copy[row.id] = isSelected;
    // }

    //return true;

    let copy = null;
    if(isSelected){
      copy = row.id;
    }

    this.setState({productsCheck: copy});
  }

  render() {

    const { products } = this.props;

    let msg = '';
    if(this.props.productsRes && (this.props.productsRes.success  === false)  ){
      msg = <Expire  delay={5000}><div className="alert alert-danger" role="alert">{JSON.stringify(this.props.productsRes.message, null, 2)}</div></Expire>;
    }

    if(this.props.productsRes && (this.props.productsRes.success === true) ){
      msg = <Expire  delay={5000}><div className="alert alert-success" role="alert">{JSON.stringify(this.props.productsRes.message, null, 2)}</div></Expire>;
    }

    const selectRowProp = {
      mode: 'radio',
      clickToSelect: true,
      onSelect: this.onRowSelect
    };


    return (
      <div className="mt-3 mb-2">
        <div className="wrapMsg">
          {msg}
        </div>

        <AddProduct key="1"/>

        <br/>
        <button onClick={this.handleEditProduct}>Edit</button><button  onClick={this.handleDeleteProduct}>Delete</button>
        <div className="row">
          <BootstrapTable  ref='table'  data={ products }  selectRow={ selectRowProp }>
            <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='sku'>Product SKU</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    products: state.products.products,
    productsRes: state.products.products_res
  };
}

export default connect(mapStateToProps, actions)(Product);
