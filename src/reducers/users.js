import { USERS_GET_CLIENTS, USERS_RES } from '../actions/types';


const INITIAL_STATE = {
  users: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USERS_RES:
      return { ...state, users_res: action.payload };
    case USERS_GET_CLIENTS:
      const users1 = { ...state, clients: action.payload };
      return users1;

    default:
      return state;
  }
}
