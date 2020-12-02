import { PAGES_ADD_MENU } from '../actions/types';
import { PAGES_CHANGE_MENU } from '../actions/types';
import { PAGES_RES } from '../actions/types';
import { PAGES_GET_MENU } from '../actions/types';
import { PAGES_DELETE_MENU } from '../actions/types';
import { PAGES_CHANGE_PAGE, PAGES_GET_PAGES, PAGES_GET_PAGE, PAGES_DELETE_PAGE, PAGES_CLEAR_PAGE } from '../actions/types';


import { CONFIG_GET_CONFIG } from '../actions/types';

const INITIAL_STATE = {
  menus: [],
  page: {},
  pages: [],
  config: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PAGES_ADD_MENU:
      const menusCopy = state.menus.slice();
      menusCopy.push(action.payload);
      const ret = { ...state, menus: menusCopy };
      return ret;

    case PAGES_CLEAR_PAGE:
      const pageC = { title: [], short_title: [], published: 0, commented: 0, after_login: 0, type: 'cms', content: [], menu_id: '', page_id:'', images: []  }; //clear input
      const retC = { ...state, page: pageC};
      return retC;

    case PAGES_CHANGE_MENU:
      let menus = state.menus.map( (elem) => {
        return ( elem.id === action.payload.id ) ? action.payload : elem;
      });
      const ret2 = { ...state, menus: menus, pages_res:{} };
      return ret2;

    case PAGES_CHANGE_PAGE:
      let r = { ...state, page: action.payload, pages_res:{} };
      return r;

    case PAGES_RES:
      return { ...state, pages_res: action.payload };
    case PAGES_GET_MENU:
      const ret4 = { ...state, menus: action.payload };
      return ret4;

    case PAGES_GET_PAGES:
      const retPages = { ...state, pages: action.payload };
      return retPages;

    case PAGES_GET_PAGE:
      const retPage = { ...state, page: action.payload, pages_res:{} };
      return retPage;

    case CONFIG_GET_CONFIG:
      const retConfig = { ...state, config: action.payload };
      return retConfig;

    case PAGES_DELETE_MENU:
      let menusCopy2 = state.menus.slice();
      let menuDel = [];
      for(let item2 of menusCopy2){
        if(item2.id !== action.payload){
          menuDel.push(item2);
        }
      }
      return { ...state, menus: menuDel };

    case PAGES_DELETE_PAGE:
      let pagesCopy2 = state.pages.slice();
      let pagesDel = [];
      for(let item2 of pagesCopy2){
        if(item2.id !== action.payload){
          pagesDel.push(item2);
        }
      }
      return { ...state, pages: pagesDel };


    default:
      return state;
  }
}
