import React, { Component } from 'react';

//import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
//import ReactDOM from 'react-dom';
//import {Editor, EditorState} from 'draft-js';

import requireAuth from '../requireAuth';
import { connect } from 'react-redux';
import * as actions from '../../actions/pages';
//import Edit from './Edit';

//import { Editor } from '@tinymce/tinymce-react';
import { isNewRecord, getPagesByMenuId } from '../../helpers/pages';

class Page extends Component {
  //state = { selectedFile: null };

  getMenuValues(){
    let menuVal = [];
    //console.log(this.props.menus);
    menuVal.push({id: null, name: ''});
    for(var menu of  this.props.menus){
      if( !isNewRecord(menu.id) ){
        menuVal.push(menu);
      }
    }
    return menuVal;
  }


  getPagePositionByMenuId = (menuId) => {
    if(!menuId){
      menuId = null;
    }else{
      menuId = parseInt(menuId);
    }
    const pagesByMenuId = getPagesByMenuId( this.props.pages, menuId );
    return  pagesByMenuId.length + 1;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const page = { ...this.props.page};
    //page.images = arrFiles;
    page.position = this.getPagePositionByMenuId(page.menu_id);
    page.images =  this.images ? this.images : [];
    console.log(page);
    //console.log(this.images);
    this.props.savePage(page, () => {
      this.props.getPages();
    });




    //const  files = this.files;
    //console.log(files);
    //console.log(files.length);


  //   var promise1 = new Promise( (resolve, reject) => {
  //     let arrFiles = [];
  //     for (let i = 0; i < files.length; i++)  //for multiple files
  //     {
  //         let f = files[i];
  //         //let name = files[i].name;
  //         //alert(name);
  //         let reader = new FileReader();
  //
  //         reader.onload = function(e) {
  //             // get file content
  //             //let text = e.target.result;
  //             //console.log(e.target.result);
  //             arrFiles.push(e.target.result);
  //             //let li = document.createElement("li");
  //             //li.innerHTML = name + "____" + text;
  //             //ul.appendChild(li);
  //         }
  //         reader.readAsDataURL(f);
  //         //reader.readAsText(f,"UTF-8");
  //     }
  //
  //     resolve(arrFiles);
  //   });
  //
  //   promise1.then( (arrFiles) => {
  //     console.log(arrFiles);
  //     let test = [...arrFiles];
  //     let p = {};
  //     p.te = "sss";
  //     p.img = test;
  //     p.rr = arrFiles;
  //     console.log(test);
  //     console.log(p);
  // // expected output: "foo"
  //
  //     const page = { ...this.props.page};
  //     page.images = arrFiles;
  //     page.position = this.getPagePositionByMenuId(page.menu_id);
  //     console.log(page);
  //     this.props.savePage(page, () => {
  //       this.props.getPages();
  //     });
  //
  //   });




    // let reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onload = (event) => {
    //   const imgData = event.target.result;
    //   console.log(imgData);
    // };



    // let formData = new FormData();
    // formData.append(
    //   'myFile',
    //   f,
    //   f.name
    // );
    // console.log(formData);

    // console.log(this.files);
    // let formData = new FormData();
    // for(let file of this.files){
    //   formData.append(
    //     'images[]',
    //     file,
    //     file.name
    //   );
    // }
    // console.log(formData.getAll('images[]'));

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

  createImage = (files) => {

    this.images = [];
    for (let i = 0; i < files.length; i++)  //for multiple files
    {
        let f = files[i];
        let name = files[i].name;
        //console.log(name);
        let reader = new FileReader();

        reader.onload = (e) => {
            //let images = this.props.page.images ?  this.props.page.images.slice() : [];
            //let images = [];

            // images.push({ data: e.target.result, name: name});
            // console.log(images);
            // let newPageData = { ...this.props.page, images: images };
            // this.props.changePage(newPageData);

            this.images.push({ data: e.target.result, name: name});

        }
        reader.readAsDataURL(f);
        //reader.readAsText(f,"UTF-8");
    }


    // let reader = new FileReader();
    // reader.onload = (e) => {
    //   this.setState({
    //     image: e.target.result
    //   })
    // };
    // reader.readAsDataURL(file);


  }





  handleUploadFile = (event) => {

    //this.setState({ selectedFile: event.target.files[0] });
    const files = event.target.files;

    if (files.length){
      this.createImage(files);
    }


    //console.log(this.files[0]);

    // let files = event.target.files;
    // let reader = new FileReader();
    // reader.readAsDataURL(files[0]);
    // reader.onload = (event) => {
    //   const pageId = this.props.page.id ? this.props.page.id : null;
    //   const imgData = { pageId: pageId, file: event.target.result};
    //   console.log(imgData);
    // };

  }

  // onSaveEditorState = (editorState) => {
  //   this.props.onSaveEditorState(editorState);
  // }



  render() {

    const menuValues = this.getMenuValues();

    const label =  this.props.page.id ? 'Edit page' : 'Add page';

    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="add-page-btn  btn btn-primary mt-2 mb-2"><i className="fas fa-plus"></i> {label}</button>
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
              <label>Published</label>
          </div>

          <div className="form-group">
              <select name="type" onChange={this.handleChangePage}  value={this.props.page.type}>
                <option value="cms">cms</option>
                <option value="gallery">gallery</option>
              </select>
              <label className="ml-1">Type</label>
          </div>

          <div className="form-group">
            <select name="menu_id" onChange={this.handleChangePage}  value={this.props.page.menu_id} >
              {menuValues.map(menu =>
                <option key={menu.id} value={menu.id}>{menu.name}</option>
              )}
            </select>
            <label className="ml-1">Menu</label>
          </div>

          <div className="form-group">
           <label htmlFor="comment">Content</label>
           <textarea className="form-control" rows="5" name="content"  onChange={this.handleChangePage}  value={this.props.page.content || ''}></textarea>
         </div>

         <div className="form-group">
          <input type="file" name="images"  onChange={this.handleUploadFile} multiple/>
         </div>
        </form>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    menus: state.pages.menus,
    pages: state.pages.pages,
    page: state.pages.page
  };
}

export default connect(mapStateToProps, actions)(requireAuth(Page));
