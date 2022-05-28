# cmsRS react client

* create server site from:

<https://github.com/cmsrs/cmsrs3>

* change SERVER_URL and API_SECRET  in file
```bash
src/config.js
```

* MENU_VISIBLE - tabs visiable in menu

example:

```bash
export const SERVER_URL = 'http://127.0.0.1:8000';
export const API_SECRET = '';
export const MENU_VISIBLE = ['pages', 'users',  'products',   'checkouts',  'contacts',  'settings'];
```

Directive API_SECRET should be the same as on file .env
on the server site



* install dependency

```bash
npm install
```

* start app

```bash
npm start
```

* build app

```bash
npm run build --path admin
cp -r build admin
cp -r admin <server_path>/public
```
