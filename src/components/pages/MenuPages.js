import React, { Component } from 'react';
//import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import Menu from './Menu';
import Page from './Page';
import PageTitle from './PageTitle';
import shortid from 'shortid';
import Expire from '../../helpers/Expire';
import '../main.css';

class MenuPages extends Component {

  componentDidMount() {
    this.props.getConfig((config) => {
      if(config){
        this.props.getMenus();
        this.props.getPages((pages) => {});
      }else{
        alert('You must set at least one language in the .env file');
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  getNotRelatedPages = () => {
    let pages = [];
    for(let page of this.props.pages){
      if( !page.menu_id ){
        pages.push(page);
      }
    }
    return pages;
  }

  showMenuPages = (menus) => {

      let ret = '';
      if(Array.isArray(menus)){

        ret = menus.map(function(item, index){
          return  <Menu key={item.id} data={item}/>
        });
      }


      return ret;
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

  handleAddMenu = () => {
    const menu = {id:  'rs_'+shortid.generate(), name: '', position: '' };
    this.props.addMenu(menu);
  }

  renderMsg = (message) => {
    console.log('msg_err',message);
    return JSON.stringify(message, null, 2);
  }


  render() {

    let cache_enable = false;
    if(this.props.config && (this.props.config.cache_enable === true) ){
      cache_enable = true;
    }

    const notRelatedPages = this.getNotRelatedPages();

    let msg = '';
    if(this.props.pagesRes && (this.props.pagesRes.success  === false)  ){

      let msgHtml = ''

      if( (typeof this.props.pagesRes.message === "object" || typeof this.props.pagesRes.message === 'function') && (this.props.pagesRes.message !== null) ){
          for(let index in this.props.pagesRes.message){
              msgHtml += this.props.pagesRes.message[index][0]+ " ";
          }
      }else if(Array.isArray(this.props.pagesRes.message)){
        for(let index in this.props.pagesRes.message){
            msgHtml += index + ": " + this.props.pagesRes.message[index][0]+ "  ";
        }
      }else{
        msgHtml = this.props.pagesRes.message;
      }

      msg = <Expire  delay={9000}><div className="alert alert-danger mb-4" role="alert">{msgHtml}</div></Expire>;
      //msg = <Expire  delay={5000}><div className="alert alert-danger" role="alert">{JSON.stringify(this.props.pagesRes.message, null, 2)}</div></Expire>;
    }

    if(this.props.pagesRes && (this.props.pagesRes.success === true) ){
      msg = <Expire  delay={9000}><div className="alert alert-success  mb-4" role="alert">{this.props.pagesRes.message}</div></Expire>;
    }

    const { menus } = this.props;

    return (
      <div className="mt-3 mb-2">
        { (cache_enable === true) &&
          <div className="alert alert-danger" role="alert">
              cache_enable is true on the .env file on server (set this param on the false, if you want something change)
          </div>
        }
        <div className="wrapMsg">
        {msg}
        </div>
        <div className="row">
          <div className="col-5">
            <button id="add_menu" className="btn btn-primary mt-2 mb-2"  onClick={this.handleAddMenu}><i className="fas fa-plus"></i> Add menu</button>
            <form onSubmit={this.handleSubmit}>
              {this.showMenuPages(menus)}
            </form>

            { notRelatedPages.length > 0 &&
              <React.Fragment>
                <h5 className="mt-4">Pages not related to menu</h5>
                <div className="ml-3">
                  {this.showPageTitle(notRelatedPages)}
                </div>
              </React.Fragment>
            }
          </div>

          <div className="col-7">
            <Page />
          </div>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menus: state.pages.menus,
    pages: state.pages.pages,
    config: state.pages.config,
    pagesRes: state.pages.pages_res
  };
}

//export default connect(mapStateToProps, actions)(requireAuth(MenuPages));
export default connect(mapStateToProps, actions)(MenuPages);
