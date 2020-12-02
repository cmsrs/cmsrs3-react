import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from './Root';
import { ADMIN_URL_SECRET } from './config';

//import reducers from './reducers';
import App from './components/App';
import Pages from './components/Pages';
import Products from './components/Products';
import Users from './components/Users';
import Contacts from './components/Contacts';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';

const urlAdmin = "/admin"+ADMIN_URL_SECRET;
const urlPages = "/admin"+ADMIN_URL_SECRET+"/pages";
const urlProducts = "/admin"+ADMIN_URL_SECRET+"/products";
const urlUsers = "/admin"+ADMIN_URL_SECRET+"/users";
const urlContacts = "/admin"+ADMIN_URL_SECRET+"/contacts";
const urlSignout = "/admin"+ADMIN_URL_SECRET+"/signout";
const urlSignin = "/admin"+ADMIN_URL_SECRET+"/signin";

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <App>
        <Route path={urlAdmin} exact component={Signin} />
        <Route path={urlPages} component={Pages} />
        <Route path={urlProducts} component={Products} />
        <Route path={urlUsers} component={Users} />
        <Route path={urlContacts} component={Contacts} />
        <Route path={urlSignout} component={Signout} />
        <Route path={urlSignin} component={Signin} />
      </App>
    </BrowserRouter>
  </Root>,
  document.querySelector('#root')
);
