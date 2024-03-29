import React, { Component } from 'react';
//import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import { getDefaultLang } from '../../helpers/pages';

class PageTitle extends Component {

  constructor(props) {
    super(props);
    this.data =  this.props.data;   //getMenuDataById(this.props.menus, this.props.data.id)
  }

  delPage = () => {
    if (window.confirm('Are you sure you wish to delete this item?')){
      this.props.delPage(this.data.id, () => {
        this.props.getPages( (pages) => {});
      });
    }
  }

  downPage = () => {
    this.props.changePosition('down', this.data.id, 'pages', () => {
      this.props.getPages( (pages) => {});
    });
  }

  upPage = () => {
    this.props.changePosition('up', this.data.id, 'pages', () => {
      this.props.getPages( (pages) => {} );
    });
  }

  //DRY!!
  getDataFromProps = () => {
    const  data = this.props.pages.filter( page => {
      return page.id === this.data.id
    });

    if(!data.length){
      return {};
    }
    return data[0];
  }

  //DRY!!
  editPage = () => {
    const data = this.getDataFromProps();
    this.props.changePage(data);
  }

  getPagesByMenuIdAndPageId = ( allPages, menuId, pageId ) => {
    let pages = [];

    for(let page of allPages){
      if( pageId &&  (parseInt(page.menu_id) === menuId) && ( parseInt(page.page_id) === pageId ) ){
        pages.push(page);
      }
      if( !pageId && (parseInt(page.menu_id) === menuId) && ( !page.page_id ) ){
        pages.push(page);
      }
    }

    return pages;
  }

  render() {
    const defaultLang = getDefaultLang(this.props.config.langs);

    const data = this.getDataFromProps();

    const pages = this.getPagesByMenuIdAndPageId(this.props.pages, data.menu_id, data.page_id);

    return (
      <div className={ this.props.child ?  'mb-2 row ml-3' : 'mb-2 row' }>
        <div className={ (data.published === 0) ?  'text-secondary' : '' }>{(data.short_title[defaultLang] +  ( (data.type === 'inner') ? ' (' + data.id + ')'  : ''  )  ) || '' }</div>
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
    page: state.pages.page,
    pages: state.pages.pages,
    config: state.pages.config
  };
}

//export default connect(mapStateToProps, actions)(requireAuth(PageTitle));
export default connect(mapStateToProps, actions)(PageTitle);
