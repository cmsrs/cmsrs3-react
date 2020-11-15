import { CONTACTS_GET_CONTACTS, CONTACTS_DELETE_CONTACT, CONTACTS_RES } from '../actions/types';

//, PRODUCTS_CHECK_PRODUCT

const INITIAL_STATE = {
  contacts: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONTACTS_RES:
      return { ...state, contacts_res: action.payload };
    case CONTACTS_GET_CONTACTS:
      return { ...state, contacts: action.payload, contacts_res:{} };
    case CONTACTS_DELETE_CONTACT:
      let contactsCopy2 = state.contacts.slice();
      let contactsDel = [];
      for(let itemp of contactsCopy2){
        if(itemp.id !== action.payload){
          contactsDel.push(itemp);
        }
      }
      return { ...state, contacts: contactsDel, contacts_res:{} };

    default:
      return state;
  }
}
