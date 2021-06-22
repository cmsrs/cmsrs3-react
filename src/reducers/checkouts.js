import { CHECKOUTS_GET_CHECKOUTS, CHECKOUTS_RES } from '../actions/types';

//, PRODUCTS_CHECK_PRODUCT

const INITIAL_STATE = {
  CHECKOUTS: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECKOUTS_RES:
      return { ...state, checkouts_res: action.payload };
    case CHECKOUTS_GET_CHECKOUTS:
      return { ...state, checkouts: action.payload, checkouts_res:{} };

    default:
      return state;
  }
}
