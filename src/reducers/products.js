import { PRODUCTS_GET_PRODUCTS, PRODUCTS_RES, PRODUCTS_GET_PAGES, PRODUCTS_SAVE_PRODUCT, PRODUCTS_CHANGE_PRODUCT, PRODUCTS_SET_PRODUCT, PRODUCTS_DELETE_PRODUCT } from '../actions/types';

//, PRODUCTS_CHECK_PRODUCT

const INITIAL_STATE = {
  products: [],
  product: {},
  check_products: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PRODUCTS_RES:
      return { ...state, products_res: action.payload };
    case PRODUCTS_GET_PRODUCTS:
      const products1 = { ...state, products: action.payload, products_res:{} };
      return products1;
    case PRODUCTS_GET_PAGES:
      const products2 = { ...state, shop_pages: action.payload, products_res:{} };
      return products2;
    case PRODUCTS_SAVE_PRODUCT: //not used
      const product = { name: '', sku: '', price: 0, description: '', page_id: '', images: []  }; //clear input
      const retP = { ...state, product: product, products_res:{}};
      return retP;
    case PRODUCTS_CHANGE_PRODUCT:
      //console.log(action.payload);
      return { ...state, product: action.payload, products_res:{} };

    case PRODUCTS_SET_PRODUCT:
      return { ...state, product: action.payload, products_res:{} };

    case PRODUCTS_DELETE_PRODUCT:
      let productsCopy2 = state.products.slice();
      let productsDel = [];
      for(let itemp of productsCopy2){
        if(itemp.id !== action.payload){
          productsDel.push(itemp);
        }
      }
      return { ...state, products: productsDel, products_res:{} };


    // case PRODUCTS_CHECK_PRODUCT:
    //   let checkProductsCopy = {};
    //   let key;
    //
    //   for (key in state.check_products) {
    //     checkProductsCopy[key] = state.check_products[key];
    //   }
    //   checkProductsCopy[action.payload.id] = action.payload.isSelected;
    //   return { ...state, check_products: checkProductsCopy, products_res:{} };

    default:
      return state;
  }
}
