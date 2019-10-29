const express = require('express');
const proxy = require('http-proxy-middleware');

const routes = require('./routes');

var app = express();

// routes(app);

app.use('/api', proxy({
	pathRewrite: { '^/api': '' },
	target: process.env.API_URL,
	changeOrigin: true,
	ws: true
}));

app.use('/', proxy({
	target: `http://localhost:${process.env.TARGET_PORT}`,
	ws: true
}));

app.listen(process.env.PROXY_PORT, () => {
	console.info(`Proxy started on Port ${process.env.PROXY_PORT}`)
});