import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import { isNewRecord } from '../../helpers/pages';

class Page extends Component {

  // componentDidMount() {
  //   this.props.getMenus();
  //   //this.props.getPages();
  //   console.log('___PageTitle___pobieram_z_serwera______');
  // }


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

  getCountPagesByMenuId = ( menuId ) => {
    let pages = [];
    for(let page of this.props.pages){
      if( parseInt(page.menu_id) === menuId ){
        pages.push(page);
      }
    }
    return pages.length;
  }


  getPagePositionByMenuId = (menuId) => {
    if(!menuId){
      menuId = null;
    }else{
      menuId = parseInt(menuId);
    }
    return  this.getCountPagesByMenuId( menuId ) + 1;
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
