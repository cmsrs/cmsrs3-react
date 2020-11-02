# cmsRS react client

* create server site from:

<https://github.com/cmsrs/cmsrs3>

* change SERVER_URL and API_SECRET  in file 
```bash
src/config.js
```

example:

```bash
export const SERVER_URL = 'http://127.0.0.1:8000';
export const API_SECRET = 'v3';
```


* install dependency

```bash
npm install
```

* start app

```bash
npm start
```

* run tests (TODO)

```bash
npm test
```

* build app

```bash
npm run build --path admin
cp -r build admin
cp -r admin <server_path>/public
```

