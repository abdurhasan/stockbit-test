const { response } = require('./response.helper');
const { cacheService } = require('./cache.helper');

const cacheMiddleware = (req, res, next) => {
  const keyCache = req.originalUrl;

  const getCacheData = cacheService.getData(keyCache);
  if (getCacheData) {
    return res.status(200).json(response(true, null, getCacheData));
  }

  return next();
};

const notFoundMiddleware = (req, res) => res.status(404).json(response(false, `Not Found - ${req.originalUrl}`));

module.exports = { cacheMiddleware, notFoundMiddleware };
