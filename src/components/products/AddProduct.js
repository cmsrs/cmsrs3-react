import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/products';
import ImageProduct from './ImageProduct';

class AddProduct extends Component {

  componentDidMount() {
    this.props.getShopPages();
  }

  getShopPages = () => {
    let shopPages = [];

    shopPages.push('');
    if(this.props.shop_pages){
      for(var shopPage of  this.props.shop_pages){
          shopPages.push(shopPage);
      }
    }
    return shopPages;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const product = { ...this.props.product};
    product.images =  this.images ? this.images.slice() : [];
    //console.log(product);

    this.props.saveProduct(product, ( productId ) => {
      //alert('ok');
      document.getElementsByName('images')[0].value = null;
      this.images = [];
      this.props.getProducts( (d) => {
      });
      this.setState({productsCheck: null});
      //this.refs.table.setState({ selectedRowKeys: [] });
      //document.getElementsByName('images')[0].value = null;
      //this.images = [];
      //this.props.getPages();
    });
  };


  // handleSubmit = (event) => {
  //   event.preventDefault();
  //
  //   const page = { ...this.props.page};
  //   page.position = this.getPagePositionByMenuId(page.menu_id);
  //   page.images =  this.images ? this.images.slice() : [];
  //   this.props.savePage(page, ( pageId ) => {
  //     document.getElementsByName('images')[0].value = null;
  //     this.images = [];
  //     this.props.getPages();
  //   });
  // }


  handleChangeProduct = (event) => {
    let newProductData;
    newProductData = { ...this.props.product, [event.target.name]: event.target.value};

    //console.log('zmiana', newProductData);
    this.props.changeProduct(newProductData);
  }

  showImages = (images) => {
      let ret = '';
      if(Array.isArray(images)){

        ret = images.map(function(item, index){
          return  <ImageProduct key={item.id} data={item} imagesByPage={images}/>
        });
      }

      return ret;
  }

  createImage = (files) => {

    this.images = [];
    for (let i = 0; i < files.length; i++)  //for multiple files
    {
        let f = files[i];
        let name = files[i].name;
        let reader = new FileReader();

        reader.onload = (e) => {
            this.images.push({ data: e.target.result, name: name});
        }
        reader.readAsDataURL(f);
        //reader.readAsText(f,"UTF-8");
    }
  }


  handleUploadFile = (event) => {
    const files = event.target.files;
    if (files.length){
      this.createImage(files);
    }
  }

  showImages = (images, productId) => {

      let ret = '';
      if(Array.isArray(images)){

        ret = images.map(function(item, index){
          return  <ImageProduct key={item.id} data={item} productId={productId}  imagesByPage={images}/>
        });
      }
      return ret;
  }

  render() {

    let images = [];

    //this.tmp(this.props.product);
    if(this.props.product.id){
       images = this.props.product.images;
    }


    //let menuValues = [];
    let shopPages = [];
    shopPages = this.getShopPages();

    //const label =  this.props.page.id ? 'Edit page' : 'Add page';
    const label =  this.props.product.id ? 'Edit product' : 'Add product';
    return (

      <div>

        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="add-page-btn  btn btn-primary mt-2 mb-2"><i className="fas fa-plus"></i> {label}</button>
          <div className="form-group">
              <input type="text" placeholder="Name" name="name" className="form-control col-5"
                  onChange={this.handleChangeProduct} value={this.props.product.name || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="Sku" name="sku" className="form-control col-5"
                  onChange={this.handleChangeProduct} value={this.props.product.sku || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="Price" name="price" className="form-control col-5"
                  onChange={this.handleChangeProduct} value={this.props.product.price || ''} />
          </div>

          <div className="form-group">
           <label htmlFor="comment">Description</label>
           <textarea className="form-control" rows="5" name="description"  onChange={this.handleChangeProduct}  value={this.props.product.description || ''}></textarea>
         </div>

          <div className="form-group">
            <select name="page_id" onChange={this.handleChangeProduct}  value={this.props.product.page_id || ''} >
              {shopPages.map(page =>
                <option key={page.id} value={page.id || ''}>{page.title || ''}</option>
              )}
            </select>
            <label className="ml-1">Page</label>
          </div>


         <div className="form-group">
          <input type="file" name="images"  onChange={this.handleUploadFile} multiple/>
         </div>

         {this.showImages(images, this.props.product.id )}

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.products.product,
    shop_pages: state.products.shop_pages
  };
}

//export default connect(mapStateToProps, actions)(requireAuth(Page));
export default connect(mapStateToProps, actions)(AddProduct);
