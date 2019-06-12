import React, { Component } from 'react';
//import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import Image from './Image';

import { isNewRecord, getPagesByMenuId } from '../../helpers/pages';

class Page extends Component {

  componentDidMount() {
    this.props.getPages();
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

    const page = { ...this.props.page};
    page.position = this.getPagePositionByMenuId(page.menu_id);
    page.images =  this.images ? this.images.slice() : [];
    this.props.savePage(page, ( pageId ) => {
      document.getElementsByName('images')[0].value = null;
      this.images = [];
      this.props.getPages();
    });
  }

  handleChangePage = (event) => {
    let newPageData;
    if( event.target.name === "published" ){
      newPageData = { ...this.props.page, [event.target.name]: event.target.checked};
    }else{
      newPageData = { ...this.props.page, [event.target.name]: event.target.value};
    }

    this.props.changePage(newPageData);
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
          return  <Image key={item.id} data={item} imagesByPage={images}/>
        });
      }

      return ret;
  }

  getImages = ( pages, pageId ) => {

    const  data = pages.filter( page => {
      return page.id === pageId
    });

    if(!data.length){
      return [];
    }

    if(!data[0].images.length){
      return [];
    }

    return data[0].images;
  }


  render() {

    const menuValues = this.getMenuValues();

    let images = [];
    if(this.props.page.id){
      images = this.getImages( this.props.pages, this.props.page.id );
    }

    const label =  this.props.page.id ? 'Edit page' : 'Add page';

    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="add-page-btn  btn btn-primary mt-2 mb-2"><i className="fas fa-plus"></i> {label}</button>
          <div className="form-group">
              <input type="text" placeholder="Title" name="title" className="form-control col-5"
                  onChange={this.handleChangePage} value={this.props.page.title || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="Short title" name="short_title" className="form-control col-5"
                  onChange={this.handleChangePage} value={this.props.page.short_title || ''} />
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

          <div className="form-group">
              <select name="type" onChange={this.handleChangePage}  value={this.props.page.type}>
                <option value="cms">cms</option>
                <option value="gallery">gallery</option>
              </select>
              <label className="ml-1">Type</label>
          </div>

          <div className="form-group">
            <select name="menu_id" onChange={this.handleChangePage}  value={this.props.page.menu_id || ''} >
              {menuValues.map(menu =>
                <option key={menu.id} value={menu.id || ''}>{menu.name || ''}</option>
              )}
            </select>
            <label className="ml-1">Menu</label>
          </div>

          <div className="form-group">
           <label htmlFor="comment">Content</label>
           <textarea className="form-control" rows="5" name="content"  onChange={this.handleChangePage}  value={this.props.page.content || ''}></textarea>
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
    page: state.pages.page
  };
}

//export default connect(mapStateToProps, actions)(requireAuth(Page));
export default connect(mapStateToProps, actions)(Page);
