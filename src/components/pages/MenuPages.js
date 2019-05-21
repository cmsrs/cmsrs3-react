import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import Menu from './Menu';
import Page from './Page';
import shortid from 'shortid';

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
    if(this.props.menusRes && !this.props.menusRes.success){
      msg = <div className="alert alert-danger" role="alert">{this.props.menusRes.message}</div>;
    }

    if(this.props.menusRes && this.props.menusRes.success){
      msg = <div className="alert alert-success" role="alert">{this.props.menusRes.message}</div>;
    }

    const { menus } = this.props;

    return (
      <div className="mt-3 mb-2">
        <button id="add_menu" className="btn btn-primary mt-2 mb-2"  onClick={this.handleAddMenu}><i className="fas fa-plus"></i> Add menu</button>
        {msg}
        <form onSubmit={this.handleSubmit}>
          {this.showMenuPages(menus)}
        </form>

        <Page />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menus: state.pages.menus,
    menusRes: state.pages.menus_res
  };
}

export default connect(mapStateToProps, actions)(requireAuth(MenuPages));
