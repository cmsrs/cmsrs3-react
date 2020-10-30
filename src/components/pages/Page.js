import React, { Component } from 'react';
//import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import Image from './Image';

// TODO problem with edit source code with CKEditor
//import CKEditor from 'ckeditor4-react';
//import CKEditor from '@ckeditor/ckeditor5-react';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { isNewRecord, getPagesByMenuId, getImages, inArray, getDefaultLang } from '../../helpers/pages';


class Page extends Component {

  constructor(props) {
    super(props);
    this.defaultLang = getDefaultLang(this.props.config.langs);

    this.state = {
      defaultLangTitle : this.defaultLang,
      defaultLangShortTitle : this.defaultLang,
      defaultLangDescription : this.defaultLang,
      defaultLangContent : this.defaultLang
    };
  }

  getRootPages = () => {
    const menuId = parseInt(this.props.page.menu_id);
    const pageId = this.props.page.id ? parseInt(this.props.page.id) : false;

    let parentIds = []
    for(let p of this.props.pages){
      if( (p.menu_id === menuId) &&  p.page_id ){
        parentIds.push(p.page_id);
      }
    }

    let pages = [];
    pages.push([]);

    //only one level of depth
    if(inArray(pageId, parentIds)){
      return pages;
    }

    for(let p of this.props.pages){
      //edit
      if( (p.menu_id === menuId) && !p.page_id && pageId && (p.id !== pageId ) ){
        pages.push(p);
      }
      //new
      if( (p.menu_id === menuId) && !p.page_id && !pageId ){
        pages.push(p);
      }

    }

    return pages;
  }

  getMenuValues(){
    let menuVal = [];
    //console.log(this.props.menus);
    menuVal.push({id: null, name: ''});
    for(var menu of  this.props.menus){
      if( !isNewRecord(menu.id) ){
        menuVal.push(menu);
      }
    }
    return menuVal;
  }

  getPagePositionByMenuId = (menuId) => {
    if(!menuId){
      menuId = null;
    }else{
      menuId = parseInt(menuId);
    }
    const pagesByMenuId = getPagesByMenuId( this.props.pages, menuId );
    return  pagesByMenuId.length + 1;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    //createTreePages(this.props.pages); //??

    const page = { ...this.props.page};
    page.position = this.getPagePositionByMenuId(page.menu_id);

    if(this.images && page.images){
      page.images = page.images.concat(this.images);
    }

    this.props.savePage(page, ( pageId ) => {
      document.getElementsByName('images')[0].value = null;
      this.images = [];
      this.props.getPages( (p) => {} );
    });
  }

  // onEditorChange = ( data ) => {
  //     let newPageData;
  //     newPageData = { ...this.props.page, content: data};
  //     this.props.changePage(newPageData);
  // }

  handleChangePage = (event) => {
    let newPageData;
    if( event.target.name === "published" || event.target.name === "commented" || event.target.name === "after_login" ){
      //console.log('test');
      newPageData = { ...this.props.page, [event.target.name]: event.target.checked};
    }else{
      newPageData = { ...this.props.page, [event.target.name]: event.target.value};
    }

    this.props.changePage(newPageData);
  }

  handleChangePageTitle = (event) => {
    alert('title');
  }
  handleChangePageShortTitle = (event) => {
    alert('short Title');
  }
  handleChangePageDescription = (event) => {
    alert('description');
  }
  handleChangePageContent = (event) => {
    alert('content');
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

  showImages = (images) => {

      let ret = '';
      if(Array.isArray(images)){

        ret = images.map(function(item, index){
          return  <Image key={item.id} imageId={item.id} />
        });
      }

      return ret;
  }

  getPageTypes = () => {
    return  this.props.config ? (this.props.config.page_types || []) : [];
  }

  changeLang = (event) => {
    const lang = event.target.attributes.getNamedItem('data-lang').value;
    const column = event.target.attributes.getNamedItem('data-column').value;

    if( "title" === column ){
      this.setState({defaultLangTitle: lang});
    }else if(  "short_title" === column  ){
      this.setState({defaultLangShortTitle: lang});
    }else if(  "description" === column  ){
      this.setState({defaultLangDescription: lang});
    }else if(  "content" === column  ){
      this.setState({defaultLangContent: lang});
    }
    //this.setState({defaultLang: lang});
  }

  // let hideTitle =  classShow; //(this.state.defaultLangTitle === lang) ? classShow : classHide;
  // let hideShortTitle = classShow;//(this.state.defaultLangShortTitle === lang) ? classShow : classHide;
  // let hideDescription = classShow;//(this.state.defaultLangDescription === lang) ? "form-control" : "form-control d-none";
  // let hideContent = classShow;//(this.state.defaultLangContent === lang) ? "form-control" : "form-control d-none";



  render() {
    const langs = this.props.config.langs;
    const defaultLang = this.defaultLang;

    const menuValues = this.getMenuValues();
    const rootPages = this.getRootPages();
    const pageTypes = this.getPageTypes();

    let images = [];
    if(this.props.page.id){
      images = getImages( this.props.pages, this.props.page.id );
    }
    const label =  this.props.page.id ? 'Edit page' : 'Add page';

    const choiceLangTitle = [];
    const choiceLangShortTitle = [];
    const choiceLangDescription = [];
    const choiceLangContent = [];
    if( langs && langs.length > 1 ){
      for(let lang of langs){
        choiceLangTitle.push(<span key={'title_'+lang} data-lang={lang} data-column="title" className="mr-2 cursor-pointer text-primary"  onClick={this.changeLang}>{lang}</span>);
        choiceLangShortTitle.push(<span key={'short_title_'+lang} data-lang={lang} data-column="short_title" className="mr-2 cursor-pointer text-primary"  onClick={this.changeLang}>{lang}</span>);
        choiceLangDescription.push(<span key={'description_'+lang} data-lang={lang} data-column="description" className="mr-2 cursor-pointer text-primary"  onClick={this.changeLang}>{lang}</span>);
        choiceLangContent.push(<span key={'content_'+lang} data-lang={lang} data-column="content" className="mr-2 cursor-pointer text-primary"  onClick={this.changeLang}>{lang}</span>);
      }
    }

    const title = [];
    const shortTitle = [];
    const description = [];
    const content = [];
    if( langs ){

      const classShow = "form-control col-5 mr-1";
      const classHide = "form-control col-5 mr-1 d-none";
      let i = 0;
      for(let lang of langs){
        let hideTitle = ((!this.state.defaultLangTitle && !i ) || (this.state.defaultLangTitle === lang)) ? classShow : classHide;
        let hideShortTitle = ((!this.state.defaultLangShortTitle && !i ) || (this.state.defaultLangShortTitle === lang)) ? classShow : classHide;
        let hideDescription =((!this.state.defaultDescription && !i ) || (this.state.defaultLangDescription === lang)) ? "form-control" : "form-control d-none";
        let hideContent =((!this.state.defaultLangContent && !i ) || (this.state.defaultLangContent === lang)) ? "form-control" : "form-control d-none";
        title.push(<input type="text" placeholder="Title" name="title" key={'t_'+lang} className={hideTitle}
              onChange={this.handleChangePageTitle} data-lang={lang}  value={this.props.page.title ? this.props.page.title[lang] : ''} />);
        shortTitle.push(<input type="text" placeholder="Short title" name="short_title" key={'st_'+lang} className={hideShortTitle}
              onChange={this.handleChangePageShortTitle} data-lang={lang}  value={this.props.page.short_title ? this.props.page.short_title[lang] : ''} />);
        description.push(<textarea type="text" placeholder="Description" name="description"  rows="4" cols="50" key={'desc_'+lang} className={hideDescription}
              onChange={this.handleChangePageDescription} data-lang={lang} value={this.props.page.description ? this.props.page.description[lang] : ''} ></textarea>);
        content.push(<textarea type="text" placeholder="Content" name="content"  rows="20" cols="80" key={'content_'+lang} style={{fontSize:"10pt"}} className={hideContent}
              onChange={this.handleChangePageContent} data-lang={lang} value={this.props.page.content ? this.props.page.content[lang] : ''} ></textarea>);
        i++;
      }
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="add-page-btn  btn btn-primary mt-2 mb-2"><i className="fas fa-plus"></i> {label}</button>

          <div className="row mt-3">
            {choiceLangTitle}
          </div>
          <div className="row form-group">
            {title}
          </div>

          <div className="row">
            {choiceLangShortTitle}
          </div>
          <div className="row form-group">
            {shortTitle}
          </div>

          <div className="row">
            {choiceLangDescription}
          </div>
          <div className="row form-group">
            {description}
          </div>

          <div className="form-check row">
              <input
                  className="col-1"
                  name="published"
                  type="checkbox"
                  checked={this.props.page.published || 0}
                  onChange={this.handleChangePage} />
              <label>Published</label>
          </div>

          <div className="form-check row">
              <input
                  className="col-1"
                  name="commented"
                  type="checkbox"
                  checked={this.props.page.commented || 0}
                  onChange={this.handleChangePage} />
              <label>Commented</label>
          </div>

          <div className="form-check row">
              <input
                  className="col-1"
                  name="after_login"
                  type="checkbox"
                  checked={this.props.page.after_login || 0}
                  onChange={this.handleChangePage} />
              <label>Available after log in</label>
          </div>

          <div className="form-group">
              <select name="type" onChange={this.handleChangePage}  value={this.props.page.type}>
                {pageTypes.map(page_type =>
                  <option key={page_type} value={page_type || ''}>{page_type || '' }</option>
                )}
              </select>
              <label className="ml-1">Type</label>
          </div>


          { (this.props.page.type !== "main_page") &&
          <React.Fragment>
            <div className="form-group">
              <select name="menu_id" onChange={this.handleChangePage}  value={this.props.page.menu_id || ''} >
                {menuValues.map(menu =>
                  <option key={menu.id} value={menu.id || ''}>{menu.name[defaultLang] || ''}</option>
                )}
              </select>
              <label className="ml-1">Menu</label>
            </div>

            <div className="form-group">
              <select name="page_id" onChange={this.handleChangePage}  value={this.props.page.page_id || ''} >
                {rootPages.map(page =>
                  <option key={page.id || ''} value={page.id || ''}>{page.title ? (page.title[defaultLang] ? page.title[defaultLang]: ''): ''}</option>
                )}
              </select>
              <label className="ml-1">Parent page</label>
            </div>
          </React.Fragment>
          }

          <div className="row">
            {choiceLangContent}
          </div>
          <div className="row form-group">
            {content}
          </div>

         <div className="form-group">
          <input type="file" name="images"  onChange={this.handleUploadFile} multiple/>
         </div>

         {this.showImages(images)}

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menus: state.pages.menus,
    pages: state.pages.pages,
    page: state.pages.page,
    config: state.pages.config
  };
}

//export default connect(mapStateToProps, actions)(requireAuth(Page));
export default connect(mapStateToProps, actions)(Page);
