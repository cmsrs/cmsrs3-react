import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import pages from './pages';

export default combineReducers({
  auth,
  pages,
  form: formReducer
});
