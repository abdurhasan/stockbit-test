require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const { notFoundMiddleware } = require('./helpers/middleware.helper');
const { writerLog, saveLog } = require('./helpers/log.helper');
const { events, EVENT_SAVE_LOG } = require('./helpers/events.helper');

events.on(EVENT_SAVE_LOG, saveLog);

const { routers } = require('./routers');

const app = express();
app.use(morgan(':url :date[iso] :response-time', {
  stream: writerLog
}));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/', routers);
app.use(notFoundMiddleware);

module.exports = { app };
