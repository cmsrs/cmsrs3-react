import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import pages from './pages';
import products from './products';
import users from './users';
import contacts from './contacts';

export default combineReducers({
  auth,
  pages,
  users,
  products,
  contacts,
  form: formReducer
});
