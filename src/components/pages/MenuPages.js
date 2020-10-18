import React, { Component } from 'react';
//import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import Menu from './Menu';
import Page from './Page';
import PageTitle from './PageTitle';
import shortid from 'shortid';
import Expire from '../../helpers/Expire';
//import { createTreePages } from '../../helpers/pages';

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
    //console.log('___MenuPages___pobieram_z_serwera______');
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
           // createTreePages(this.props.pages, item.id );
          return  <Menu key={item.id} data={item}/>
        });
      }


      return ret;
  }

  showPageTitle = (pages) => {
      let ret = '';
      if(Array.isArray(pages)){
        //console.log(pages);
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
    //console.log('msg_err',this.props.pagesRes.message);
    console.log('msg_err',message);
    return JSON.stringify(message, null, 2);
  }


  render() {

    const notRelatedPages = this.getNotRelatedPages();

    let msg = '';
    if(this.props.pagesRes && (this.props.pagesRes.success  === false)  ){
      msg = <Expire  delay={5000}><div className="alert alert-danger" role="alert">{JSON.stringify(this.props.pagesRes.message, null, 2)}</div></Expire>;
    }

    if(this.props.pagesRes && (this.props.pagesRes.success === true) ){
      msg = <Expire  delay={5000}><div className="alert alert-success" role="alert">{JSON.stringify(this.props.pagesRes.message, null, 2)}</div></Expire>;
    }

    const { menus } = this.props;

    return (
      <div className="mt-3 mb-2">
        <div className="wrapMsg">
        {msg}
        </div>
        <div className="row">
          <div className="col-4">
            <button id="add_menu" className="btn btn-primary mt-2 mb-2"  onClick={this.handleAddMenu}><i className="fas fa-plus"></i> Add menu</button>
            <form onSubmit={this.handleSubmit}>
              {this.showMenuPages(menus)}
            </form>

            { notRelatedPages.length > 0 &&
              <React.Fragment>
                <h5 className="mt-3">Pages not related to menu</h5>
                <div className="ml-3">
                  {this.showPageTitle(notRelatedPages)}
                </div>
              </React.Fragment>
            }
          </div>

          <div className="col-8">
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
    pagesRes: state.pages.pages_res
  };
}

//export default connect(mapStateToProps, actions)(requireAuth(MenuPages));
export default connect(mapStateToProps, actions)(MenuPages);
