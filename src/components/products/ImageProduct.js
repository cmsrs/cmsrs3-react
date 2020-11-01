import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/products';
import {SERVER_URL} from '../../config';
import { getImageById, changeItemInArr, getDataFromItems, getNewTranslateLangsObj, getDefaultLang } from '../../helpers/pages';

class ImageProduct extends Component {

  constructor(props) {
    super(props);
    this.state = { defaultLang : getDefaultLang(this.props.config.langs) };
  }

  delImage = () => {
    this.props.delImage(this.props.imageId, () => {
      this.props.getProducts( (products) => {
        const product = getDataFromItems(products, this.props.productId);
        this.props.changeProduct(product);
      });
    });
  }

  downImage = () => {
    this.props.changePosition('down', this.props.imageId, 'images', () => {
      this.props.getProducts( (products) => {
        let product = getDataFromItems(products, this.props.productId);
        product = {...product};
        this.props.changeProduct(product);
      });
    });
  }

  upImage = () => {
    this.props.changePosition('up', this.props.imageId, 'images', () => {
      this.props.getProducts( (products) => {
        let product = getDataFromItems(products, this.props.productId);
        product = {...product};
        this.props.changeProduct(product);
      });
    });
  }

/*
  handleChange = (event) => {
    let image = getImageById(this.props.product.images, this.props.imageId);
    image.alt = event.target.value;

    let images = changeItemInArr(this.props.product.images, image);
    let newProductData = { ...this.props.product, 'images': images};

    this.props.changeProduct(newProductData);
  }
*/

  handleChangeAlt= (event) => {
    const langs = this.props.config.langs;
    //const stateMenu = getMenuDataById(this.props.menus, this.data.id);

    let image = getImageById(this.props.product.images, this.props.imageId);
    //let images = changeItemInArr(this.props.page.images, image);


    const lang = event.target.attributes.getNamedItem('data-lang').value;
    const newTranslateValueData = getNewTranslateLangsObj(langs, image.alt, lang, event.target.value);
    image.alt = newTranslateValueData;

    let images = changeItemInArr(this.props.product.images, image);

    let newProductData = { ...this.props.product, 'images': images};
    this.props.changeProduct(newProductData);
  }

  changeLang = (event) => {
    const lang = event.target.attributes.getNamedItem('data-lang').value;
    this.setState({defaultLang: lang});
  }

  render() {

    let image = getImageById(this.props.product.images, this.props.imageId);
    const langs = this.props.config.langs;
    
    const choiceLang = [];
    if( langs && langs.length > 1 ){
      const classShow = "mr-2 cursor-pointer text-primary";
      const classHide = "mr-2 cursor-pointer text-secondary";
      let i = 0;
      for(let lang of langs){
        let hide = ((!this.state.defaultLang && !i ) || (this.state.defaultLang === lang)) ? classShow : classHide;
        choiceLang.push(<span key={'choice_'+lang} data-lang={lang} className={hide}  onClick={this.changeLang}>{lang}</span>);
        i++;
      }
    }

    const alts = [];
    if( langs ){
      for(let lang of langs){
        let hide = (this.state.defaultLang === lang) ? "form-control col-10 mr-1" : "form-control col-10 mr-1 d-none";
        alts.push(<input type="text" placeholder="Image alt" name="alt" key={lang} className={hide}
              onChange={this.handleChangeAlt} data-lang={lang}  value={image.alt ? ( image.alt[lang] ? image.alt[lang] : '' ) : ''} />);
      }
    }

    return (
      <div className="ml-1  mt-3 row">
        <img  src={SERVER_URL + image.fs.small} alt={image.alt} />

        <div className="ml-1 row">
          {choiceLang}

          {(this.props.product.images.length > 1) &&
          <React.Fragment>
            <div className="ml-2"  onClick={this.downImage}><i className="fas fa-arrow-down cursor-pointer"></i></div>
            <div className="ml-2"  onClick={this.upImage}><i className="fas fa-arrow-up cursor-pointer"></i></div>
          </React.Fragment>
          }
          <div className="trash ml-2"  onClick={this.delImage}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>
          {alts}

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.products.product,
    config: state.pages.config
  };
}

//export default connect(null, actions)(requireAuth(Image));
export default connect(mapStateToProps, actions)(ImageProduct);
