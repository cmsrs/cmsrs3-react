import axios from 'axios';
import { SERVER_URL, API_SECRET  } from '../config';
//import { SETTINGS_GET_CACHE_CLEAR, SETTINGS_GET_CREATE_SITEMAP, SETTINGS_RES } from './types';
import { getPrefixUrl } from '../helpers/pages';


const prefixUrl = getPrefixUrl(SERVER_URL, API_SECRET);

export const getClearcache = (callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    await axios.get(
      prefixUrl+'/config/clearcache?token='+token
    );
    //dispatch({ type: CHECKOUTS_GET_CHECKOUTS, payload: response.data.data });
    callback();

  } catch(e){
    console.log("Unknown problem with ajax, while get clearcache");
     //dispatch({ type: CHECKOUTS_RES, payload: {success: false, message: "Unknown problem with ajax, while get clearcache"} });
  }
};

export const getCreatesitemap = (callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    await axios.get(
      prefixUrl+'/config/createsitemap?token='+token
    );
    //dispatch({ type: CHECKOUTS_GET_CHECKOUTS, payload: response.data.data });
    callback();

  } catch(e){
    console.log("Unknown problem with ajax, while get createsitemap");
     //dispatch({ type: CHECKOUTS_RES, payload: {success: false, message: "Unknown problem with ajax, while get clearcache"} });
  }
};
