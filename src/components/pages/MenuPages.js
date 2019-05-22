import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import Menu from './Menu';
import Page from './Page';
import shortid from 'shortid';
import Expire from '../../helpers/Expire';

class MenuPages extends Component {

  componentDidMount() {
    this.props.getMenus();
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  showMenuPages = (menus) => {

      let ret = '';
      if(Array.isArray(menus)){

        ret = menus.map(function(item, index){
          return  <Menu key={item.id} data={item}/>
        });


        // for( let menu of menus ){
        //   ret = (
        //     <div>
        //       <Menu key={menu.id} data={menu}/>
        //     </div>
        //   );
        // }
      }

      return ret;
  }

  handleAddMenu = () => {
    const menu = {id:  'rs_'+shortid.generate(), name: '', position: '' };
    this.props.addMenu(menu);
  }

  // handleAddPage = () => {
  //   const page = {id:  'rs_'+shortid.generate(), title: '', short_title: '', published: 0, position: '', type: '', menu_id: '' };
  //   this.props.addPage(page);
  // }


  render() {
    let msg = '';
    if(this.props.pagesRes && (this.props.pagesRes.success  === false)  ){
      msg = <Expire  delay={5000}><div className="alert alert-danger" role="alert">{this.props.pagesRes.message}</div></Expire>;
    }

    if(this.props.pagesRes && (this.props.pagesRes.success === true) ){
      msg = <Expire  delay={5000}><div className="alert alert-success" role="alert">{this.props.pagesRes.message}</div></Expire>;
    }

    const { menus } = this.props;

    return (
      <div className="mt-3 mb-2">
        {msg}
        <div className="row">
          <div className="col-6">
            <button id="add_menu" className="btn btn-primary mt-2 mb-2"  onClick={this.handleAddMenu}><i className="fas fa-plus"></i> Add menu</button>
            <form onSubmit={this.handleSubmit}>
              {this.showMenuPages(menus)}
            </form>
          </div>

          <div className="col-6">
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
    pagesRes: state.pages.pages_res
  };
}

export default connect(mapStateToProps, actions)(requireAuth(MenuPages));
