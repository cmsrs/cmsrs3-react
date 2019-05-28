import React, { Component } from 'react';

//import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import ReactDOM from 'react-dom';
//import {Editor, EditorState} from 'draft-js';

import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
//import Edit from './Edit';

//import { Editor } from '@tinymce/tinymce-react';
import { isNewRecord, getPagesByMenuId } from '../../helpers/pages';

class Page extends Component {


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
    this.props.savePage(page, () => {
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

  // onSaveEditorState = (editorState) => {
  //   this.props.onSaveEditorState(editorState);
  // }



  render() {

    const menuValues = this.getMenuValues();

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

          <div className="form-group row">
              <select name="type" onChange={this.handleChangePage}  value={this.props.page.type}>
                <option value="cms">cms</option>
                <option value="gallery">gallery</option>
              </select>
              <label className="ml-1">Type</label>
          </div>

          <div className="form-group row">
            <select name="menu_id" onChange={this.handleChangePage}  value={this.props.page.menu_id} >
              {menuValues.map(menu =>
                <option key={menu.id} value={menu.id}>{menu.name}</option>
              )}
            </select>
            <label className="ml-1">Menu</label>
          </div>

          <div className="form-group">
           <label htmlFor="comment">Content:</label>
           <textarea className="form-control" rows="5" name="content"  onChange={this.handleChangePage}  value={this.props.page.content || ''}></textarea>
         </div>

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

export default connect(mapStateToProps, actions)(requireAuth(Page));
