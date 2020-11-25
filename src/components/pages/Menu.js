import React, { Component } from 'react';
//import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import { getMenuDataById, isNewRecord, createTreePagesByMenuId, getDefaultLang, getNewTranslateLangsObj } from '../../helpers/pages';
//import {  } from '../../helpers/pages';
import PageTitle from './PageTitle';
import '../main.css';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.data =  this.props.data;   //getMenuDataById(this.props.menus, this.props.data.id)
    this.state = { defaultLang : getDefaultLang(this.props.config.langs) };
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

  handleChangeName = (event) => {
    const langs = this.props.config.langs;
    const stateMenu = getMenuDataById(this.props.menus, this.data.id);


    const lang = event.target.attributes.getNamedItem('data-lang').value;
    const newTranslateValueData = getNewTranslateLangsObj(langs ,stateMenu.name, lang, event.target.value);

    const newMenuData = { ...stateMenu, name: newTranslateValueData};
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
    if (window.confirm('Are you sure you wish to delete this item?')){
      this.props.delMenu(this.data.id);
    }
  }

  showPageTitle = (pagesTree) => {
      let ret = [];
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

  changeLang = (event) => {
    const lang = event.target.attributes.getNamedItem('data-lang').value;
    this.setState({defaultLang: lang});
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

    const names = [];
    for(let lang of langs){
      let hide = (this.state.defaultLang === lang) ? "form-control col-5 mr-1" : "form-control col-5 mr-1 d-none";
      names.push(<input type="text" placeholder="Menu name" name="name" key={lang} className={hide}
            onChange={this.handleChangeName} data-lang={lang}  value={stateMenu.name[lang] || ''} />);
    }

    return (
      <div>
        <div className="form-group container mb-2 mt-3">
          <div className="row">
            {choiceLang}
          </div>
          <div className="row">
            {names}
            <div className="ml-2"  onClick={this.saveMenu}><i className="far fa-save cursor-pointer"></i></div>
            <div className="ml-2 trash"  onClick={this.delMenu}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>
            {!isNew &&  (this.getCountMenu() > 1) &&
            <React.Fragment>
              <div className="ml-2"  onClick={this.downMenu}><i className="fas fa-arrow-down cursor-pointer"></i></div>
              <div className="ml-2"  onClick={this.upMenu}><i className="fas fa-arrow-up cursor-pointer"></i></div>
            </React.Fragment>
            }
          </div>
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
