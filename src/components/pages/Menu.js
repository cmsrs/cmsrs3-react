import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import { getMenuDataById } from '../../helpers/pages';




class Menu extends Component {

  constructor(props) {
    super(props);
    this.data =  this.props.data;   //getMenuDataById(this.props.menus, this.props.data.id)
  }

  handleChange = (event) => {
    const stateMenu = getMenuDataById(this.props.menus, this.data.id);
    const newMenuData = { ...stateMenu, [event.target.name]: event.target.value};
    this.props.changeMenu(newMenuData);
  }

  saveMenu = () => {
    const stateMenu = getMenuDataById(this.props.menus, this.data.id);
    this.props.saveMenu(stateMenu);
  }

  delMenu = () => {
    this.props.delMenu(this.data.id);
  }

  render() {

    let stateMenu = {};
    if( Array.isArray(this.props.menus) ){
      stateMenu =  getMenuDataById(this.props.menus, this.data.id);
    }

    return (
      <div className="form-group form-inline row  mb-2">
        <input type="text" placeholder="Menu name" name="name" className="form-control col-3 mr-1"
              onChange={this.handleChange} value={stateMenu.name || ''} />
        <input type="text" placeholder="Menu position" name="position" className="form-control col-1 mr-1"
              onChange={this.handleChange} value={stateMenu.position || ''} />
        <div className="ml-2 mr-2"  onClick={this.saveMenu}><i className="far fa-save"></i></div>
        <div className="trash"  onClick={this.delMenu}><i className="fas fa-trash"  aria-hidden="true"/></div>

      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    menus: state.pages.menus
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Menu));
