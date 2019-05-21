import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import { isNewRecord } from '../../helpers/pages';

class Page extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const page = { ...this.props.page};
    this.props.savePage(page);
  }

  handleChangePage = (event) => {
    //const stateMenu = getMenuDataById(this.props.menus, this.data.id);
    const newPageData = { ...this.props.page, [event.target.name]: event.target.value};
    //console.log(newPageData);
    this.props.changePage(newPageData);
  }

  render() {

    //const label =  isNewRecord( this.props.page.id ) ? 'Add' : 'Edit';
    const label =  isNewRecord( 'rs_' ) ? 'Add page' : 'Edit page';

    return (
      <div className="mt-3">
        <h4>Add Page</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <input type="text" placeholder="Title" name="title" className="form-control col-4"
                  onChange={this.handleChangePage} value={this.props.page.title || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="Short title" name="short_title" className="form-control col-4"
                  onChange={this.handleChangePage} value={this.props.page.short_title || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="Published" name="published" className="form-control col-4"
                  onChange={this.handleChangePage} value={this.props.page.published || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="Position" name="position" className="form-control col-4"
                  onChange={this.handleChangePage} value={this.props.page.position || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="type" name="type" className="form-control col-4"
                  onChange={this.handleChangePage} value={this.props.page.type || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="menu_id" name="menu_id" className="form-control col-4"
                  onChange={this.handleChangePage} value={this.props.page.menu_id || ''} />
          </div>
          <button type="submit" className="btn btn-primary"><i className="fas fa-plus"></i> {label}</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.pages.page
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Page));
