import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import { getMenuDataById, isNewRecord } from '../../helpers/pages';
//import {  } from '../../helpers/pages';
import PageTitle from './PageTitle';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.data =  this.props.data;   //getMenuDataById(this.props.menus, this.props.data.id)
  }

  // componentDidMount() {
  //   this.props.getMenus();
  // }


  handleChange = (event) => {
    const stateMenu = getMenuDataById(this.props.menus, this.data.id);
    const newMenuData = { ...stateMenu, [event.target.name]: event.target.value};
    this.props.changeMenu(newMenuData);
  }

  saveMenu = () => {
    const stateMenu = getMenuDataById(this.props.menus, this.data.id);
    this.props.saveMenu(stateMenu, () => {
      this.props.getMenus();      
    });
  }

  delMenu = () => {
    this.props.delMenu(this.data.id);
  }

  showPageTitle = (pages) => {
      let ret = '';
      if(Array.isArray(pages)){
        ret = pages.map(function(item, index){
          return  <PageTitle key={item.id} data={item}/>
        });
      }
      return ret;
  }

  getPagesByMenuId = ( menuId ) => {
    let pages = [];
    if(isNewRecord(menuId)){
      return pages;
    }

    for(let page of this.props.pages){
      if( parseInt(page.menu_id) === menuId ){
        pages.push(page);
      }
    }
    return pages;
  }

  render() {

    let stateMenu = {};
    if( Array.isArray(this.props.menus) ){
      stateMenu =  getMenuDataById(this.props.menus, this.data.id);
    }

    const pages = this.getPagesByMenuId( this.data.id );

    return (
      <div>
        <div className="row form-group form-inline mb-2">
          <input type="text" placeholder="Menu name" name="name" className="form-control col-3 mr-1"
                onChange={this.handleChange} value={stateMenu.name || ''} />
          <input type="text" placeholder="Menu position" name="position" className="form-control col-1 mr-1"
                onChange={this.handleChange} value={stateMenu.position || ''} />
          <div className="ml-2 mr-2"  onClick={this.saveMenu}><i className="far fa-save cursor-pointer"></i></div>
          <div className="trash"  onClick={this.delMenu}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>
        </div>
        <div className="ml-3">
          {this.showPageTitle(pages)}
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    menus: state.pages.menus,
    pages: state.pages.pages
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Menu));
