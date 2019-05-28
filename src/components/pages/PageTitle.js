import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import { getPagesByMenuId } from '../../helpers/pages';
//import { getPagesByMenuId } from '../../helpers/pages';
//import { getMenuDataById } from '../../helpers/pages';
//import { isNewRecord } from '../../helpers/pages';

class PageTitle extends Component {

  constructor(props) {
    super(props);
    this.data =  this.props.data;   //getMenuDataById(this.props.menus, this.props.data.id)

    //console.log(this.data);
  }

  // componentDidMount() {
  //   this.props.getPages();
  // }

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

  downPage = () => {
    this.props.changePosition('down', this.data.id, 'pages', () => {
      this.props.getPages();
    });
  }

  upPage = () => {
    this.props.changePosition('up', this.data.id, 'pages', () => {
      this.props.getPages();
    });
  }


  editPage = () => {
    const data = this.getDataFromProps();
    this.props.changePage(data);
  }

  render() {
    const data = this.getDataFromProps();

    const pages = getPagesByMenuId(this.props.pages, data.menu_id);

    return (
      <div className="mb-2 row">
        <div>{data.title}</div>
        <div className="ml-2 mr-2"  onClick={this.editPage}><i className="far fa-edit cursor-pointer"/></div>
        <div className="trash"  onClick={this.delPage}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>

        {(pages.length > 1) &&
        <React.Fragment>
          <div className="ml-2"  onClick={this.downPage}><i className="fas fa-arrow-down cursor-pointer"></i></div>
          <div className="ml-2"  onClick={this.upPage}><i className="fas fa-arrow-up cursor-pointer"></i></div>
        </React.Fragment>
        }


      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    //menus: state.pages.menus,
    pages: state.pages.pages
  };
}

export default connect(mapStateToProps, actions)(requireAuth(PageTitle));
