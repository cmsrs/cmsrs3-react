import axios from 'axios';
import { SERVER_URL, API_SECRET } from '../config';
import { USERS_GET_CLIENTS, USERS_RES } from './types';

import { getPrefixUrl } from '../helpers/pages';
const prefixUrl = getPrefixUrl(SERVER_URL, API_SECRET);


export const getClients = () => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      prefixUrl+'/users/clients?token='+token
    );
    dispatch({ type: USERS_GET_CLIENTS, payload: response.data.data });

  } catch(e){
     dispatch({ type: USERS_RES, payload: {success: false, message: "Unknown problem with ajax, while get clients"} });
  }
};
