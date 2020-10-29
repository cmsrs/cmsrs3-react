//export const PREFIX_MENU = 'rs_';

export const getDataFromItems = (items, id) => {
  const  data = items.filter( item => {
    return item.id === parseInt(id);
  });


  if(!data.length){
    return {};
  }
  return data[0];
}

export const createTreePagesByMenuId = (pages, menuId) => {

  if(!pages.length){
      return false;
  }

  let pagesByMenuId2 = pages.filter( item => {
    return parseInt(item.menu_id) === menuId;
  });

  if(!pagesByMenuId2.length){
    return false;
  }

  let tree = [];
  for(let page of pagesByMenuId2){
    if( !page.page_id ){
      //tree[page.id] = page;
      tree.push(page);
    }
  }

  let pk = [];
  for(let page2 of pagesByMenuId2){
    pk[page2.page_id] = [];
  }

  //position is importent therefore i use push - insted find py key
  for(let page2 of pagesByMenuId2){
    if( page2.page_id ){
      pk[page2.page_id].push(page2);
      //tree[page2.page_id]['children'] = p2;
    }
  }

  for(let t of tree){
    if( pk[t.id] ){
      t['children'] = pk[t.id];
    }
  }

  return tree
};

export const  getMenuDataById = (menus, menuId) => {
  let ret = null;
  for(let item of menus){
    if(item.id === menuId){
      ret = item;
      break;
    }
  }
  return ret;
};

export const  isNewRecord = (menuId) => {
  if( !menuId ){
    return false;
  }

  if( menuId[0]+menuId[1]+menuId[2] === 'rs_'){
    return true;
  }
  return false;
};

export const  getImageById = (images, imageId) => {
  let ret = null;
  for(let image of images){
    if(image.id === imageId){
      ret = image;
      break;
    }
  }
  return ret;
};

export const changeItemInArr = ( arr, item ) => {
  let ret = [];

  for(let a of arr){
    if(a.id === item.id ){
      ret.push(item);
    }else{
      ret.push(a);
    }
  }

  return ret;
}

export const getImages = ( pages, pageId ) => {

  const  data = pages.filter( page => {
    return page.id === pageId
  });

  if(!data.length){
    return [];
  }

  if(!data[0].images.length){
    return [];
  }

  return data[0].images;
}




// export const getPagesByMenuId = ( menuId ) => {
//   let pages = [];
//   if(isNewRecord(menuId)){
//     return pages;
//   }
//
//   for(let page of this.props.pages){
//     if( page.menu_id === menuId ){
//       pages.push(page);
//     }
//   }
//   return pages;
// }


export const getPagesByMenuId = ( allPages, menuId ) => {
  let pages = [];
  if(isNewRecord(menuId)){
    return pages;
  }

  for(let page of allPages){
    if( !menuId &&  !page.menu_id){
      pages.push(page);
    }else if( parseInt(page.menu_id) === menuId ){
      pages.push(page);
    }
  }
  return pages;
}


export const inArray = (needle, haystack) => {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(haystack[i] === needle) return true;
    }
    return false;
}

export const getDefaultLang = (langs) => {
    return langs ? langs[0] : '';  
}
