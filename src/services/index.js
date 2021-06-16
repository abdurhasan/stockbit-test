const axios = require('axios');

require('dotenv').config();
const { response } = require('../helpers/response.helper');
const { cacheService } = require('../helpers/cache.helper');
const { logModel } = require('../models/log.model');

const BASE_URL = process.env.OMDB_BASEURL;
const API_KEY = process.env.OMDB_SECRET_KEY;

const services = {
  sayHello: (req, res) => res.status(200).json(response(true, "hii, it's stockbit test")),
  search: async (req, res) => {
    try {
      const searchQuery = req.query.s ? req.query.s : 'movie';
      const pageQuery = Number(req.query.page) ? req.query.page : 1;
      const url = `${BASE_URL}?apikey=${API_KEY}&page=${pageQuery}&s=${searchQuery}`;
      const data = await services.callMovie({ url, cacheKey: req.originalUrl });
      return res.status(200).json(response(true, null, data));
    } catch (error) {
      return res.status(422).json(response(false, error.message));
    }
  },
  detail: async (req, res) => {
    try {
      const { imdbID } = req.params;
      const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`;
      const data = await services.callMovie({ url, cacheKey: req.originalUrl });
      return res.status(200).json(response(true, null, data));
    } catch (error) {
      return res.status(422).json(response(false, error.message));
    }
  },
  callMovie: async ({ url, cacheKey }) => {
    const runRequest = await axios.get(url);
    const data = (runRequest.data && typeof (runRequest.data) === 'object') ? runRequest.data : null;
    if (cacheKey && data) {
      cacheService.setData(cacheKey, data);
    }
    return data;
  },

  getLog: async (req, res) => {
    const { limit } = req.query;
    const { skip } = req.query;
    const data = await logModel.getLogs(limit, skip);

    res.status(200).json(response(true, 'succes', data));
  }

};

module.exports = { services };
