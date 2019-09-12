import axios from 'axios';
import { SERVER_URL } from '../config';
import { PRODUCTS_RES, PRODUCTS_GET_PRODUCTS } from './types';


export const getProducts = () => async dispatch => {
  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(
      SERVER_URL+'/api/products?token='+token
    );
    //console.log("response",response.data.data);
    dispatch({ type: PRODUCTS_GET_PRODUCTS, payload: response.data.data });
    //callback();

  } catch(e){
     dispatch({ type: PRODUCTS_RES, payload: {success: false, message: "Unknown problem with ajax, while get products"} });
  }
};
