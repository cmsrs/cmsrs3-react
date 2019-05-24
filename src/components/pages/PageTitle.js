import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
//import { getPagesByMenuId } from '../../helpers/pages';
//import { getMenuDataById } from '../../helpers/pages';
//import { isNewRecord } from '../../helpers/pages';

class PageTitle extends Component {

  constructor(props) {
    super(props);
    this.data =  this.props.data;   //getMenuDataById(this.props.menus, this.props.data.id)
  }

  delPage = () => {
    this.props.delPage(this.data.id);
  }

  getDataFromProps(){
    const  data = this.props.pages.filter( page => {
      return page.id === this.data.id
    });

    if(!data.length){
      return {};
    }
    return data[0];
  }

  editPage = () => {
    const data = this.getDataFromProps();
    this.props.changePage(data);
  }

  render() {
    const data = this.getDataFromProps();
    return (
      <div className="mb-2 row">
        <div>{data.title}</div>
        <div className="ml-2 mr-2"  onClick={this.editPage}><i className="far fa-edit cursor-pointer"/></div>
        <div className="trash"  onClick={this.delPage}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>
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

export default connect(mapStateToProps, actions)(requireAuth(PageTitle));
