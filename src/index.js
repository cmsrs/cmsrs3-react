import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
//import { Provider } from 'react-redux';
//import { createStore, applyMiddleware } from 'redux';
//import reduxThunk from 'redux-thunk';
import Root from './Root';

//import reducers from './reducers';
import App from './components/App';
import Pages from './components/Pages';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';


ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Signin} />
        <Route path="/pages" component={Pages} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
      </App>
    </BrowserRouter>
  </Root>,
  document.querySelector('#root')
);
