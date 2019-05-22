import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import { isNewRecord } from '../../helpers/pages';

class Page extends Component {

  // constructor(props) {
  //   super(props);
  // }


  getMenuValues(){
    let menuVal = [];
    menuVal.push({id: 0, name: ''});
    for(var menu of  this.props.menus){
      if( !isNewRecord(menu.id) ){
        menuVal.push(menu);
      }
    }
    return menuVal;
  }


  // componentDidMount() {
  //   this.menuValues = this.getMenuValues();
  //   console.log('menuValues',  this.menuValues);
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    const page = { ...this.props.page};
    this.props.savePage(page);
  }

  handleChangePage = (event) => {

    let newPageData;
    if( event.target.name === "published" ){
      newPageData = { ...this.props.page, [event.target.name]: event.target.checked};
    }else{
      newPageData = { ...this.props.page, [event.target.name]: event.target.value};
    }

    this.props.changePage(newPageData);
  }

  render() {

    const menuValues = this.getMenuValues();

    //const label =  isNewRecord( this.props.page.id ) ? 'Add' : 'Edit';
    //const label =  isNewRecord( 'rs_' ) ? 'Add page' : 'Edit page';
    const label =  this.props.page.id ? 'Edit page' : 'Add new page';

    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="btn btn-primary mt-2 mb-2"><i className="fas fa-plus"></i> {label}</button>
          <div className="form-group">
              <input type="text" placeholder="Title" name="title" className="form-control col-5"
                  onChange={this.handleChangePage} value={this.props.page.title || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="Short title" name="short_title" className="form-control col-5"
                  onChange={this.handleChangePage} value={this.props.page.short_title || ''} />
          </div>

          <div className="form-check row">
              <input
                  className="col-1"
                  name="published"
                  type="checkbox"
                  checked={this.props.page.published || 0}
                  onChange={this.handleChangePage} />
              <label className="col-1">
              Published
              </label>
          </div>

          <div className="form-group">
              <select name="type" onChange={this.handleChangePage}  value={this.props.page.type}>
                <option value="cms">cms</option>
                <option value="gallery">gallery</option>
              </select>
          </div>

          <div className="form-group">
            <select name="menu_id" onChange={this.handleChangePage}  value={this.props.page.menu_id} >
              {menuValues.map(menu =>
                <option key={menu.id} value={menu.id}>{menu.name}</option>
              )}
            </select>
          </div>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menus: state.pages.menus,
    page: state.pages.page
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Page));
