import axios from 'axios';
import { SERVER_URL } from '../config';
import { USERS_GET_CLIENTS, USERS_RES } from './types';


export const getClients = () => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      SERVER_URL+'/api/users/clients?token='+token
    );
    //console.log("response",response.data.data);
    dispatch({ type: USERS_GET_CLIENTS, payload: response.data.data });
    //callback();

  } catch(e){
     dispatch({ type: USERS_RES, payload: {success: false, message: "Unknown problem with ajax, while get clients"} });
  }
};
