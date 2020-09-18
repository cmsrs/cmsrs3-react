import axios from 'axios';
import { isNewRecord } from '../helpers/pages';

import { SERVER_URL } from '../config';
import { PAGES_ADD_MENU, PAGES_CHANGE_MENU, PAGES_GET_MENU, PAGES_DELETE_MENU, PAGES_RES } from './types'; //, PAGES_POSITION_MENU
import { PAGES_SAVE_PAGE, PAGES_CHANGE_PAGE, PAGES_GET_PAGES, PAGES_DELETE_PAGE } from './types';



export const delImage = (imageId, callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try{
    const response = await axios.delete(
      SERVER_URL+'/api/images/'+imageId+'?token='+token
    );

    if(!response.data.success){
      //const strErr = JSON.stringify(response.data.error, null, 2);
      dispatch({ type: PAGES_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
    }

    callback();
  } catch(e){
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while deleteing image"} });
  }
}


export const changePosition = (direction, itemId, menusOrPagesOrImg, callback) => async dispatch => {
  const token = localStorage.getItem('token');
  try{
    const response = await axios.get(
      SERVER_URL+'/api/'+menusOrPagesOrImg+'/position/'+direction+'/'+itemId+'?token='+token
    );

    if(!response.data.success){
      dispatch({ type: PAGES_RES, payload: {success: false, message: "Problem with change position "+menusOrPagesOrImg} });
    }else{
      dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
    }

    callback();
  } catch(e){
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while change "+menusOrPagesOrImg+" position"} });
  }
}

export const delMenu = (menuId) => async dispatch => {
  const token = localStorage.getItem('token');
  const isNewMenu = isNewRecord(menuId);

  try{
    if( !isNewMenu ){
      const response = await axios.delete(
        SERVER_URL+'/api/menus/'+menuId+'?token='+token
      );

      if(!response.data.success){
        //const strErr = JSON.stringify(response.data.error, null, 2);
        dispatch({ type: PAGES_RES, payload: {success: false, message: response.data.error} });
      }else{
        dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
      }
    }

    dispatch({ type: PAGES_DELETE_MENU, payload: menuId });
  } catch(e){

     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while deleteing menu"} });
  }
}

export const delPage = (pageId) => async dispatch => {
  const token = localStorage.getItem('token');

  //console.log(SERVER_URL);
  try{
    //console.log( 'del_menuId', menuId );
    const response = await axios.delete(
      SERVER_URL+'/api/pages/'+pageId+'?token='+token
    );

    if(!response.data.success){
      //const strErr = JSON.stringify(response.data.error, null, 2);
      dispatch({ type: PAGES_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
    }

    dispatch({ type: PAGES_DELETE_PAGE, payload: pageId });
  } catch(e){
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while deleteing page"} });
  }
}

export const getMenus = () => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      SERVER_URL+'/api/menus?token='+token
    );
    //console.log("response",response.data.data);
    dispatch({ type: PAGES_GET_MENU, payload: response.data.data });
    //callback();

  } catch(e){
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while get menu"} });
  }
};


export const getPages = () => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      SERVER_URL+'/api/pages?token='+token
    );
    //console.log("response",response.data.data);
    dispatch({ type: PAGES_GET_PAGES, payload: response.data.data });

  } catch(e){
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while get pages"} });
  }
};

export const addMenu = (menu) => dispatch => {
  dispatch({ type: PAGES_ADD_MENU, payload: menu });
};


export const saveMenu = (menu, callback) => async  dispatch => {

  const token = localStorage.getItem('token');
  const isNewMenu = isNewRecord(menu.id);

  try {

    let response = null;
    if( isNewMenu ){
      response = await axios.post(
        SERVER_URL+'/api/menus?token='+token,
        menu
      );
    }else{
      response = await axios.put(
        SERVER_URL+'/api/menus/'+menu.id+'?token='+token,
        menu
      );
    }

    if(!response.data.success){
      //const strErr = JSON.stringify(response.data.error, null, 2);
      dispatch({ type: PAGES_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
      callback();
    }

  } catch (e) {
     console.log('___probem with ajax______', e);
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while save Menu"} });
  }
};

export const savePage = (page, callback) => async  dispatch => {

  const token = localStorage.getItem('token');

  try {
    let response = null;
    if( page.id ){
      response = await axios.put(
        SERVER_URL+'/api/pages/'+page.id+'?token='+token,
        page
      );
    }else{
      response = await axios.post(
        SERVER_URL+'/api/pages?token='+token,
        page
      );
    }

    if(!response.data.success){
      //const strErr = JSON.stringify(response.data.error, null, 2);
      dispatch({ type: PAGES_RES, payload: {success: false, message: response.data.error} });
    }else{
      const pageId = page.id ? page.id : response.data.data.pageId; //update
      //console.log('___ok___pageid='+pageId);
      dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
      dispatch({ type: PAGES_SAVE_PAGE, payload: page });
      callback(pageId);
    }

  } catch (e) {
     console.log('___probem with ajax______', e);
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while save page"} });
  }
}

// export const getImagesByPage = ( pageId ) =>  async  dispatch => {
//
//   //console.log(pageId);
//   const token = localStorage.getItem('token');
//
//   try {
//     const response = await axios.get(
//       SERVER_URL+'/api/images/'+pageId+'?token='+token
//     );
//
//     //console.log("response_img",response.data.data);
//
//     //dispatch({ type: PAGES_GET_MENU, payload: response.data.data });
//     //callback();
//
//     //let imagesByPage = [];
//     dispatch({ type: PAGES_GET_IMAGES_BY_PAGE, payload: response.data.data });
//
//   } catch(e){
//      dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while get image by page"} });
//   }
// }


export const changeMenu = (menu) => dispatch => {
  dispatch({ type: PAGES_CHANGE_MENU, payload: menu });
};

export const changePage = (page) => dispatch => {
  dispatch({ type: PAGES_CHANGE_PAGE, payload: page });
};
