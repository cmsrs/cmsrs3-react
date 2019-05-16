import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

//import reduxPromise from 'redux-promise';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

export default ({ children, initialState = {} }) => {

  const store = createStore(
    reducers,
    {
      auth: { authenticated: localStorage.getItem('token') },
      ...initialState
    },
    composeWithDevTools(

      applyMiddleware(reduxThunk),
      // other store enhancers if any
    )

    //applyMiddleware(reduxThunk)
     //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return <Provider store={store}>{children}</Provider>;
};
