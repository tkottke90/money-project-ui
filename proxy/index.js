const express = require('express');
const proxy = require('http-proxy-middleware');

const api = process.env.API_URL;
const ui = 'localhost:4200';

var app = express();

app.use('/', proxy({
	target: ui,
	changeOrigin: true
}));

app.listen(process.env.PROXY_PORT, () => {
	console.info('Proxy started on Port 3000')
});