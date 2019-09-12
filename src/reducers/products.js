import { PRODUCTS_GET_PRODUCTS, PRODUCTS_RES } from '../actions/types';


const INITIAL_STATE = {
  products: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PRODUCTS_RES:
      return { ...state, products_res: action.payload };
    case PRODUCTS_GET_PRODUCTS:
      const products1 = { ...state, products: action.payload };
      return products1;

    default:
      return state;
  }
}
