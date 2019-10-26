const express = require('express');
const proxy = require('http-proxy-middleware');

var app = express();

app.use('/', proxy({
	target: `http://localhost:${process.env.TARGET_PORT}`,
	ws: true
}));

app.use('/api', proxy({
	target: process.env.API_URL,
	changeOrigin: true,
	ws: true
}));

app.listen(process.env.PROXY_PORT, () => {
	console.info(`Proxy started on Port ${process.env.PROXY_PORT}`)
});