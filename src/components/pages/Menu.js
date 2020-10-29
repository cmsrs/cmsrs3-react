import React, { Component } from 'react';
//import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import { getMenuDataById, isNewRecord, createTreePagesByMenuId, getDefaultLang } from '../../helpers/pages';
//import {  } from '../../helpers/pages';
import PageTitle from './PageTitle';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.data =  this.props.data;   //getMenuDataById(this.props.menus, this.props.data.id)

    //console.log(pagesTree);
    //this.childrenPages = this.getPageTreeChildren(this.pagesTree);
  }

  getPageTreeChildren = (pagesTree) => {
      if(!pagesTree){
          return false;
      }
      let childeren = [];
      for(let page of  pagesTree){
        if(page['children']){
          for(let p of page['children']){
            childeren.push(p);
          }
        }
      }
      return childeren;
  }

  handleChange = (event) => {
    const stateMenu = getMenuDataById(this.props.menus, this.data.id);
    const newMenuData = { ...stateMenu, [event.target.name]: event.target.value};
    this.props.changeMenu(newMenuData);
  }

  getCountMenu = () => {
    let menus = [];
    for(let menu of this.props.menus){
      if(!isNewRecord(menu.id)){
        menus.push(menu);
      }
    }

    return menus.length;
  }

  saveMenu = () => {
    const stateMenu = getMenuDataById(this.props.menus, this.data.id);
    if(!stateMenu.position){
      stateMenu.position = this.getCountMenu() + 1;
    }

    this.props.saveMenu(stateMenu, () => {
      this.props.getMenus();
    });
  }

  delMenu = () => {
    this.props.delMenu(this.data.id);
  }

  showPageTitle = (pagesTree) => {
      let ret = [];
      //if(Array.isArray(pagesTree)){
        // ret = pages.map(function(item, index){
        //   return  <PageTitle key={item.id} data={item}/>
        // }, { 'childrenPages' : this.childrenPages } );
        for(let index of Object.keys(pagesTree) ){
          let page = pagesTree[index];
          ret.push(<PageTitle key={page.id} data={page} child={false}/>);
          if(page.children){
            for(let ii of Object.keys(page.children)){
              let p = page.children[ii];
              ret.push(<PageTitle key={p.id} data={p} child={true}/>);
            }
          }

        }
      //}
      return ret;
  }

  downMenu = () => {
    this.props.changePosition('down', this.data.id, 'menus', () => {
      this.props.getMenus();
    });
  }

  upMenu = () => {
    this.props.changePosition('up', this.data.id, 'menus', () => {
      this.props.getMenus();
    });
  }


  render() {

    let stateMenu = {};
    let isNew = false;
    if( Array.isArray(this.props.menus) ){
      stateMenu =  getMenuDataById(this.props.menus, this.data.id);
      isNew =  isNewRecord(stateMenu.id);
    }

    const pagesTree = createTreePagesByMenuId(this.props.pages, this.data.id);
    const langs = this.props.config.langs;
    const defaultLang = getDefaultLang(this.props.config.langs);
    //console.log(pagesTree);
    //const pages = getPagesByMenuId(this.props.pages,  this.data.id);

    return (
      <div>
        <div className="form-group form-inline mb-2">
          <input type="text" placeholder="Menu name" name="name" className="form-control col-3 mr-1"
                onChange={this.handleChange} value={stateMenu.name[defaultLang] || ''} />
          <div className="ml-2"  onClick={this.saveMenu}><i className="far fa-save cursor-pointer"></i></div>
          <div className="ml-2 trash"  onClick={this.delMenu}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>
          {!isNew &&  (this.getCountMenu() > 1) &&
          <React.Fragment>
            <div className="ml-2"  onClick={this.downMenu}><i className="fas fa-arrow-down cursor-pointer"></i></div>
            <div className="ml-2"  onClick={this.upMenu}><i className="fas fa-arrow-up cursor-pointer"></i></div>
          </React.Fragment>
          }
        </div>
        <div className="ml-3" >
          {this.showPageTitle(pagesTree)}
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    menus: state.pages.menus,
    pages: state.pages.pages,
    config: state.pages.config
  };
}

//export default connect(mapStateToProps, actions)(requireAuth(Menu));
export default connect(mapStateToProps, actions)(Menu);
