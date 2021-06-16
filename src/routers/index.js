const express = require('express');

const routers = express.Router();
const { services } = require('../services');
const { cacheMiddleware } = require('../helpers/middleware.helper');

routers.get('/', services.sayHello);
routers.get('/search', cacheMiddleware, services.search);
routers.get('/detail/:imdbID', cacheMiddleware, services.detail);
routers.get('/log', services.getLog);

module.exports = { routers };
