import axios from 'axios';
import { isNewRecord, getPrefixUrl } from '../helpers/pages';

import { SERVER_URL, API_SECRET } from '../config';
import { PAGES_ADD_MENU, PAGES_CHANGE_MENU, PAGES_GET_MENU, PAGES_DELETE_MENU, PAGES_RES } from './types'; //, PAGES_POSITION_MENU
import { PAGES_CHANGE_PAGE, PAGES_GET_PAGES, PAGES_GET_PAGE, PAGES_DELETE_PAGE, PAGES_CLEAR_PAGE } from './types';
import { CONFIG_GET_CONFIG } from './types';

const prefixUrl = getPrefixUrl(SERVER_URL, API_SECRET);

export const delImage = (imageId, callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try{
    const response = await axios.delete(
      prefixUrl+'/images/'+imageId+'?token='+token
    );

    if(!response.data.success){
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
      prefixUrl+'/'+menusOrPagesOrImg+'/position/'+direction+'/'+itemId+'?token='+token
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
        prefixUrl+'/menus/'+menuId+'?token='+token
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

export const delPage = (pageId, callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try{
    const response = await axios.delete(
      prefixUrl+'/pages/'+pageId+'?token='+token
    );

    if(!response.data.success){
      dispatch({ type: PAGES_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
      callback();
    }

    dispatch({ type: PAGES_DELETE_PAGE, payload: pageId });
  } catch(e){
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while deleteing page"} });
  }
}

export const getConfig = (callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      prefixUrl+'/config?token='+token
    );
    dispatch({ type: CONFIG_GET_CONFIG, payload: response.data.data });
    callback(response.data.data);

  } catch(e){
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while get config"} });
  }
};


export const getMenus = () => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      prefixUrl+'/menus?token='+token
    );
    dispatch({ type: PAGES_GET_MENU, payload: response.data.data });

  } catch(e){
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while get menu"} });
  }
};


export const getPages = (callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      prefixUrl+'/pages?token='+token
    );

    dispatch({ type: PAGES_GET_PAGES, payload: response.data.data });
    callback(response.data.data);

  } catch(e){
    console.log('___probem with ajax______', e);
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while get pages"} });
  }
};

//it is nowhare use
export const getPage = (pageId, callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      prefixUrl+'/pages/'+pageId+'?token='+token
    );

    dispatch({ type: PAGES_GET_PAGE, payload: response.data.data });
    callback(response.data.data);

  } catch(e){
      console.log('___probem with ajax______', e);
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while get page"} });
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
        prefixUrl+'/menus?token='+token,
        menu
      );
    }else{
      response = await axios.put(
        prefixUrl+'/menus/'+menu.id+'?token='+token,
        menu
      );
    }

    if(!response.data.success){
      dispatch({ type: PAGES_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
      callback();
    }

  } catch (e) {
     console.log('___probem with ajax - save menu______', e);
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while save Menu"} });
  }
};

export const savePage = (page, callback) => async  dispatch => {

  const token = localStorage.getItem('token');

  try {
    let response = null;
    if( page.id ){
      response = await axios.put(
        prefixUrl+'/pages/'+page.id+'?token='+token,
        page
      );
    }else{
      response = await axios.post(
        prefixUrl+'/pages?token='+token,
        page
      );
    }

    if(!response.data.success){
      dispatch({ type: PAGES_RES, payload: {success: false, message: response.data.error} });
      callback(false); //potrzebne aby wyswietlic preloader
    }else{
      const pageId = page.id ? page.id : response.data.data.pageId; //update


      dispatch({ type: PAGES_RES, payload: {success: true, message: "Data was saved"} });
      callback(pageId);
    }

  } catch (e) {
     console.log('___probem with ajax______', e);
     dispatch({ type: PAGES_RES, payload: {success: false, message: "Unknown problem with ajax, while save page"} });
     callback(false); //potrzebne aby wyswietlic preloader
  }
}


export const clearPage = () => dispatch => {
  dispatch({ type: PAGES_CLEAR_PAGE });
};


export const changeMenu = (menu) => dispatch => {
  dispatch({ type: PAGES_CHANGE_MENU, payload: menu });
};


export const changePage = (page) => dispatch => {
  dispatch({ type: PAGES_CHANGE_PAGE, payload: page });
};
