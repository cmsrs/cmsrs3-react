import axios from 'axios';
import { SERVER_URL, API_SECRET  } from '../config';
import { CHECKOUTS_GET_CHECKOUTS, CHECKOUTS_RES } from './types';
import { getPrefixUrl } from '../helpers/pages';

const prefixUrl = getPrefixUrl(SERVER_URL, API_SECRET);

export const getCheckouts = (callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      prefixUrl+'/checkouts?token='+token
    );
    dispatch({ type: CHECKOUTS_GET_CHECKOUTS, payload: response.data.data });
    callback(response.data.data);

  } catch(e){
     dispatch({ type: CHECKOUTS_RES, payload: {success: false, message: "Unknown problem with ajax, while get checkouts"} });
  }
};

export const updateCheckout = (checkoutId, callback) => async  dispatch => {

  const token = localStorage.getItem('token');

  try {
    const response = await axios.put(
      prefixUrl+'/checkouts/' +checkoutId+'?token='+token,
      {
        'is_pay' : 1
      }
    );

    if(!response.data.success){
      dispatch({ type: CHECKOUTS_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: CHECKOUTS_RES, payload: {success: true, message: "Data was saved"} });
      callback();
    }

  } catch (e) {
     console.log('___probem with ajax - update checkout______', e);
     dispatch({ type: CHECKOUTS_RES, payload: {success: false, message: "Unknown problem with ajax, while update checkouts"} });
  }
};
