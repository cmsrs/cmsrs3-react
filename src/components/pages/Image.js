import React, { Component } from 'react';
//import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
import {SERVER_URL} from '../../config';

class Image extends Component {

  delImage = () => {
    this.props.delImage(this.props.data.id, () => {
      this.props.getPages();
    });
  }

  downImage = () => {
    this.props.changePosition('down', this.props.data.id, 'images', () => {
      this.props.getPages();
    });
  }

  upImage = () => {
    this.props.changePosition('up', this.props.data.id, 'images', () => {
      this.props.getPages();
    });
  }

  render() {

    return (
      <div className="ml-1  mt-3 row">
        <img  src={SERVER_URL + this.props.data.fs.small}   alt={this.props.data.name}/>

        <div className="trash ml-2"  onClick={this.delImage}><i className="fas fa-trash cursor-pointer"  aria-hidden="true"/></div>

        {(this.props.imagesByPage.length > 1) &&
        <React.Fragment>
          <div className="ml-2"  onClick={this.downImage}><i className="fas fa-arrow-down cursor-pointer"></i></div>
          <div className="ml-2"  onClick={this.upImage}><i className="fas fa-arrow-up cursor-pointer"></i></div>
        </React.Fragment>
        }

      </div>
    )
  }
}


//export default connect(null, actions)(requireAuth(Image));
export default connect(null, actions)(Image);
