import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/products';
import ImageProduct from './ImageProduct';
import { getDefaultLang, getNewTranslateLangsObj } from '../../helpers/pages';


class AddProduct extends Component {

  constructor(props) {
    super(props);
    this.defaultLang = getDefaultLang(this.props.config.langs);
    this.state = {
      defaultLangName : this.defaultLang,
      defaultLangDescription : this.defaultLang
    };
  }

  componentDidMount() {
    this.props.getConfig((config) => {
      if(config){
        this.props.getShopPages();
        this.props.getProducts( (d) => {
        });
      }else{
        alert('You must set at least one language in the .env file');
      }
    });
    //console.log('___MenuPages___pobieram_z_serwera______');
  }

  getShopPages = () => {
    let shopPages = [];

    //shopPages.push('');
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

    if(this.images && product.images){
      product.images = product.images.concat(this.images);
    }

    this.props.saveProduct(product, ( productId ) => {
      document.getElementsByName('images')[0].value = null;
      this.images = [];
      this.props.getProducts( (d) => {
      });
      this.setState({productsCheck: null});
    });
  };

  handleChangeProduct = (event) => {
    let newProductData;
    newProductData = { ...this.props.product, [event.target.name]: event.target.value};

    this.props.changeProduct(newProductData);
  }

  showImages = (images, productId) => {
      let ret = '';
      if(Array.isArray(images)){

        ret = images.map(function(item, index){
          return  <ImageProduct key={item.id} imageId={item.id}  productId={productId} />
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

  handleChangePageName = (event) => {
    const langs = this.props.config.langs;
    const lang = event.target.attributes.getNamedItem('data-lang').value;
    const newTranslateValueData = getNewTranslateLangsObj(langs, this.props.product.product_name, lang, event.target.value);
    const newProductData = { ...this.props.product, product_name: newTranslateValueData};
    this.props.changeProduct(newProductData);
  }

  handleChangePageDescription = (event) => {
    const langs = this.props.config.langs;
    const lang = event.target.attributes.getNamedItem('data-lang').value;
    const newTranslateValueData = getNewTranslateLangsObj(langs, this.props.product.product_description, lang, event.target.value);
    const newProductData = { ...this.props.product, product_description: newTranslateValueData};
    this.props.changeProduct(newProductData);
  }

  changeLang = (event) => {
    const lang = event.target.attributes.getNamedItem('data-lang').value;
    const column = event.target.attributes.getNamedItem('data-column').value;

    if( "product_name" === column ){
      this.setState({defaultLangName: lang});
    }else if(  "product_description" === column  ){
      this.setState({defaultLangDescription: lang});
    }
    //this.setState({defaultLang: lang});
  }


  render() {

    const langs = this.props.config.langs;
    const defaultLang0 = getDefaultLang(this.props.config.langs);
    let images = [];

    //console.log(this.props.product);
    if(this.props.product.id){
       images =  this.props.product.images; //getImages( this.props.products, this.props.product.id );
       //console.log(images);
    }

    let shopPages = [];
    shopPages = this.getShopPages();

    const label =  this.props.product.id ? 'Edit product' : 'Add product';

    //console.log(this.props.product);

    const choiceLangName = [];
    const choiceLangDescription = [];
    if( langs && langs.length > 1 ){
      const classShow = "mr-2 mt-3 cursor-pointer text-primary";
      const classHide = "mr-2 mt-3  cursor-pointer text-secondary";
      let i = 0;
      for(let lang of langs){
        let hideName = ((!this.state.defaultLangName && !i ) || (this.state.defaultLangName === lang)) ? classShow : classHide;
        let hideDescription =((!this.state.defaultLangDescription && !i ) || (this.state.defaultLangDescription === lang)) ? classShow : classHide;

        choiceLangName.push(<span key={'name_'+lang} data-lang={lang} data-column="product_name" className={hideName}  onClick={this.changeLang}>{lang}</span>);
        choiceLangDescription.push(<span key={'description_'+lang} data-lang={lang} data-column="product_description" className={hideDescription}  onClick={this.changeLang}>{lang}</span>);

        i++;
      }
    }


    const name = [];
    const description = [];
    if( langs ){

      const classShow = "form-control col-5 mr-1";
      const classHide = "form-control col-5 mr-1 d-none";
      let i = 0;
      for(let lang of langs){
        let hideName = ((!this.state.defaultLangName && !i ) || (this.state.defaultLangName === lang)) ? classShow : classHide;
        let hideDescription =((!this.state.defaultLangDescription && !i ) || (this.state.defaultLangDescription === lang)) ? "form-control" : "form-control d-none";

        name.push(<input type="text" placeholder="Name" name="product_name" key={'t_'+lang} className={hideName}
              onChange={this.handleChangePageName} data-lang={lang}  value={this.props.product.product_name ? (this.props.product.product_name[lang] ? this.props.product.product_name[lang] : ''): ''} />);
        description.push(<textarea type="text" placeholder="Description" name="product_description"  rows="4" cols="50" key={'desc_'+lang} className={hideDescription}
              onChange={this.handleChangePageDescription} data-lang={lang} value={this.props.product.product_description ? (this.props.product.product_description[lang] ? this.props.product.product_description[lang] : ''): ''} ></textarea>);
        i++;
      }
    }

    return (

      <div>

        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="add-page-btn  btn btn-primary mt-2 mb-2"><i className="fas fa-plus"></i> {label}</button>
          <div className="form-group">
            <div className="row mt-1">
              {choiceLangName}
            </div>
            {name}
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
           <div className="row">
             {choiceLangDescription}
           </div>
           {description}
         </div>

          <div className="form-group">
            <select name="page_id" onChange={this.handleChangeProduct}  value={this.props.product.page_id || ''} >
              {shopPages.map(page =>
                <option key={page.id || ''} value={page.id || ''}>{page.title ? ( page.title[defaultLang0] ? page.title[defaultLang0] : '' ) : ''}</option>
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
    products: state.products.products,
    shop_pages: state.products.shop_pages,
    config: state.pages.config
  };
}

export default connect(mapStateToProps, actions)(AddProduct);
