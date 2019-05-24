import axios from 'axios';
import { isNewRecord } from '../helpers/pages';

import { SERVER_URL } from '../config';
import { PAGES_ADD_MENU, PAGES_CHANGE_MENU, PAGES_GET_MENU, PAGES_DELETE_MENU, PAGES_RES } from './types';
import { PAGES_SAVE_PAGE, PAGES_CHANGE_PAGE, PAGES_GET_PAGES, PAGES_DELETE_PAGE } from './types';
//import { PAGES_SAVE_MENU } from './types';

export const delMenu = (menuId) => async dispatch => {
  const token = localStorage.getItem('token');
  const isNewMenu = isNewRecord(menuId);

  //console.log(SERVER_URL);
  try{
    //console.log( 'del_menuId', menuId );
    if( !isNewMenu ){
      const response = await axios.delete(
        SERVER_URL+'/api/menus/'+menuId+'?token='+token
      );

      if(!response.data.success){
        const strErr = JSON.stringify(response.data.error, null, 2);
        dispatch({ type: PAGES_RES, payload: {success: false, message: strErr} });
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
      const strErr = JSON.stringify(response.data.error, null, 2);
      dispatch({ type: PAGES_RES, payload: {success: false, message: strErr} });
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

  //const test = isNewRecord('r1_2');
  //console.log('__2_test0=', test);


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

  //const test = isNewRecord('r1_2');
  //console.log('__2_test0=', test);


  try {
    const response = await axios.get(
      SERVER_URL+'/api/pages?token='+token
    );
    //console.log("response",response.data.data);
    dispatch({ type: PAGES_GET_PAGES, payload: response.data.data });
    //callback();

  } catch(e){
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while get pages"} });
  }
};




export const addMenu = (menu) => dispatch => {

  //console.log( 'add_menu', menu );
  dispatch({ type: PAGES_ADD_MENU, payload: menu });
};

//export const addPage = (page) => dispatch => {
//  dispatch({ type: PAGES_ADD_PAGE, payload: page });
//};


export const saveMenu = (menu) => async  dispatch => {

  //const token = 'token342342';
  const token = localStorage.getItem('token');
  const isNewMenu = isNewRecord(menu.id);
  //console.log('isNewRecord', isNewRecord);

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
      const strErr = JSON.stringify(response.data.error, null, 2);
      dispatch({ type: PAGES_RES, payload: {success: false, message: strErr} });
    }else{
      console.log('___ok___');
      dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
    }

  } catch (e) {
     console.log('___probem with ajax______', e);
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while save Menu"} });
  }
};

export const savePage = (page) => async  dispatch => {

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
      const strErr = JSON.stringify(response.data.error, null, 2);
      dispatch({ type: PAGES_RES, payload: {success: false, message: strErr} });
    }else{
      console.log('___ok___');
      dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
      dispatch({ type: PAGES_SAVE_PAGE, payload: page });
    }

  } catch (e) {
     console.log('___probem with ajax______', e);
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while save page"} });
  }
}


export const changeMenu = (menu) => dispatch => {
  dispatch({ type: PAGES_CHANGE_MENU, payload: menu });
};

export const changePage = (page) => dispatch => {
  dispatch({ type: PAGES_CHANGE_PAGE, payload: page });
};
