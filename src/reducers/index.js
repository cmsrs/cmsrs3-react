import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import pages from './pages';
import products from './products';
import users from './users';

export default combineReducers({
  auth,
  pages,
  users,
  products,
  form: formReducer
});
