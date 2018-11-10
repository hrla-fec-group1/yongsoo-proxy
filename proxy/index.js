const express = require('express');
const morgan = require('morgan');
const path = require('path');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const yongsooServer = 'http://54.183.184.86';
const steveServer = 'http://13.57.49.186:3000';
const dylanServer = 'http:/52.13.8.105';
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'client')));

app.all('/api/songs', (req, res) => {
  console.log('redirecting to yongsooServer');
  apiProxy.web(req, res, {target: yongsooServer});
});

app.all('/data', (req, res) => {
  console.log('redirecting to steveServer');
  apiProxy.web(req, res, {target: steveServer});
});

app.all('/artists', (req, res) => {
  console.log('redirecting to dylanServer');
  apiProxy.web(req, res, {target: dylanServer});
})

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});