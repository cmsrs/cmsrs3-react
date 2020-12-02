import axios from 'axios';
import { SERVER_URL, API_SECRET  } from '../config';
import { CONTACTS_GET_CONTACTS, CONTACTS_DELETE_CONTACT, CONTACTS_RES } from './types';
import { getPrefixUrl } from '../helpers/pages';

const prefixUrl = getPrefixUrl(SERVER_URL, API_SECRET);

export const getContacts = (callback) => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      prefixUrl+'/contacts?token='+token
    );
    dispatch({ type: CONTACTS_GET_CONTACTS, payload: response.data.data });
    callback(response.data.data);

  } catch(e){
     dispatch({ type: CONTACTS_RES, payload: {success: false, message: "Unknown problem with ajax, while get contacts"} });
  }
};

export const deleteContact = (contactId) =>  async dispatch => {

  const token = localStorage.getItem('token');

  try{
    const response = await axios.delete(
      prefixUrl+'/contacts/'+contactId+'?token='+token
    );

    if(!response.data.success){
      dispatch({ type: CONTACTS_RES, payload: {success: false, message: response.data.error} });
    }else{
      dispatch({ type: CONTACTS_RES, payload: {success: true, message: "Data was saved"} });
    }

    dispatch({ type: CONTACTS_DELETE_CONTACT, payload: contactId });
  } catch(e){
     dispatch({ type: CONTACTS_RES, payload: {success: false, message: "Unknown problem with ajax, while deleteing contact"} });
  }
}
