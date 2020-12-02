import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import {SERVER_URL} from '../../config';
import { getImageById, changeItemInArr,  getDefaultLang, getNewTranslateLangsObj } from '../../helpers/pages';
import '../main.css';

class Image extends Component {

  constructor(props) {
    super(props);
    this.state = { defaultLang : getDefaultLang(this.props.config.langs) };
  }

  //DRY!!
  getDataFromProps = (pageId) => {
    const  data = this.props.pages.filter( page => {
      return page.id === pageId
    });

    if(!data.length){
      return {};
    }
    return data[0];
  }

  //DRY!!
  editPage = (pageId) => {
    const data = this.getDataFromProps(pageId);
    this.props.changePage(data);
  }


  delImage = () => {
    if (window.confirm('Are you sure you wish to delete this item?')){
      this.props.delImage(this.props.imageId, () => {
        this.props.getPages((pages) => {
          this.editPage(this.props.page.id);
        });
      });
    }
  }

  downImage = () => {
    this.props.changePosition('down', this.props.imageId, 'images', () => {
      this.props.getPages((pages) => {
          this.editPage(this.props.page.id);
      });
    });
  }

  upImage = () => {
    this.props.changePosition('up', this.props.imageId, 'images', () => {
      this.props.getPages((pages) => {
        this.editPage(this.props.page.id);
      });
    });
  }

  handleChangeAlt = (event) => {
    const langs = this.props.config.langs;

    let image = getImageById(this.props.page.images, this.props.imageId);


    const lang = event.target.attributes.getNamedItem('data-lang').value;
    const newTranslateValueData = getNewTranslateLangsObj(langs, image.alt, lang, event.target.value);
    image.alt = newTranslateValueData;

    let images = changeItemInArr(this.props.page.images, image);

    let newPageData = { ...this.props.page, 'images': images};
    this.props.changePage(newPageData);
  }

  changeLang = (event) => {
    const lang = event.target.attributes.getNamedItem('data-lang').value;
    this.setState({defaultLang: lang});
  }

  render() {
    let image = getImageById(this.props.page.images, this.props.imageId);

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
    for(let lang of langs){
      let hide = (this.state.defaultLang === lang) ? "form-control col-10 mr-1" : "form-control col-10 mr-1 d-none";
      alts.push(<input type="text" placeholder="Image alt" name="alt" key={lang} className={hide}
            onChange={this.handleChangeAlt} data-lang={lang}  value={  image ? (image.alt ? ( image.alt[lang] ? image.alt[lang] : '' ) : '') : ''} />);
    }

    const imgFs = image ? (SERVER_URL + image.fs.small) : '';
    const imgAlt = image ? (image.alt ? image.alt : '') : '';

    const imgLength = this.props.page.images ? this.props.page.images.length : 0;

    return (


      <div className="ml-1  mt-3 row">
        <img src={imgFs} alt={imgAlt} />

        <div className="ml-1 row">
          {choiceLang}

          {(imgLength > 1) &&
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
    page: state.pages.page,
    pages: state.pages.pages,
    config: state.pages.config
  };
}

export default connect(mapStateToProps, actions)(Image);
