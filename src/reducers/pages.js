import { PAGES_ADD_MENU } from '../actions/types';
//import { PAGES_SAVE_MENU } from '../actions/types';
import { PAGES_CHANGE_MENU } from '../actions/types';
import { PAGES_RES } from '../actions/types';
import { PAGES_GET_MENU } from '../actions/types';
import { PAGES_DELETE_MENU } from '../actions/types';
//import { getMenuDataById } from '../helpers/pages';



// const INITIAL_STATE = {
//   menus :[
//     {
//       name: "menu_name1",
//       position: 1,
//       pages: [
//         {
//           title: "title test1 buzz fue",
//           short_title: "title test1",
//           published: 1,
//           type: "cms",
//           position: 1,
//           contents: {en: "bee buzz fue buzz fue buzz fue buzz fue buzz fue buzz fue"  },
//           images: [
//             {
//               title: "img test1",
//               name: "img_test1.png"
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };


// const INITIAL_STATE = {
//   menus : {
//     name: '',
//     position: ''
//   },
//   menusRes: {}
// };

//  menus : {},
//  menusRes: {}


const INITIAL_STATE = {};



export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PAGES_ADD_MENU:
      //const menusCopy = [...state.menus];
      const menusCopy = state.menus.slice();

      //console.log('menusCopy', menusCopy);
      //console.log('pay', action.payload);


      menusCopy.push(action.payload);
      //console.log('menusCopyAfter', menusCopy);

      const ret = { ...state, menus: menusCopy };
      //console.log('state', ret);
      return ret;
    // case PAGES_SAVE_MENU:
    //   const key = 0;
    //   const menusCopySave = [...state.menus];
    //   menusCopySave[key] = action.payload;
    //   const retSave = { ...state, menus: menusCopySave };
    //   return retSave;
    case PAGES_CHANGE_MENU:
      //console.log('pay',action.payload);
      //const copyMenus = state.menus.slice();
      let menus = state.menus.map( (elem) => {
        return ( elem.id === action.payload.id ) ? action.payload : elem;
      });
      //console.log('reducer_menus',  menus);

      const ret2 = { ...state, menus: menus };
      return ret2;



      // const copyMenu = { ...state.menus[action.payload.index], ...action.payload.menu };
      // let menus = state.menus.slice();
      // menus[action.payload.index] = copyMenu;
      // const ret2 = { ...state, menus: menus };
      // return ret2;
    case PAGES_RES:
      return { ...state, menus_res: action.payload };
    case PAGES_GET_MENU:
      const ret4 = { ...state, menus: action.payload };
      //const ret4 = { menus: action.payload };
      //console.log('ret4', ret4);

      //console.log('_________PAGES_GET_MENU_________');
      return ret4;

    case PAGES_DELETE_MENU:
      let menusCopy2 = state.menus.slice();
      //menusCopy2.splice(action.payload,1);
      let menuDel = [];
      for(let item2 of menusCopy2){
        if(item2.id !== action.payload){
          menuDel.push(item2);
        }
      }

      return { ...state, menus: menuDel };
    default:
      return state;
  }
}
