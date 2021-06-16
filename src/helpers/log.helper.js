const { Writable } = require('stream');
const { events, EVENT_SAVE_LOG } = require('./events.helper');
const { logModel } = require('../models/log.model');

async function saveLog(payload) {
  const requestUrl = (payload && payload.requestUrl) ? payload.requestUrl : null;
  const responseTime = (payload && payload.responseTime) ? payload.responseTime : null;
  const requestAt = (payload && payload.requestAt) ? payload.requestAt : null;
  if (requestUrl && responseTime && requestAt) {
    await logModel.createLog(requestUrl, requestAt, responseTime);
  }
}

class MyLogStream extends Writable {
  constructor() {
    super();
    this.requestUrl = null;
    this.requestAt = null;
    this.responseTime = null;
  }

  write(line) {
    const getLog = typeof (line) === 'string' ? line.split(' ') : null;
    if (getLog) {
      const [reqUrl, reqAt, resTime] = getLog;
      this.requestUrl = reqUrl;
      this.requestAt = reqAt.replace(/\n/g, '');
      this.responseTime = parseInt(resTime, 10);
      events.emit(EVENT_SAVE_LOG, {
        requestUrl: this.requestUrl,
        requestAt: this.requestAt,
        responseTime: this.responseTime
      });
    }
  }
}

const writerLog = new MyLogStream();

module.exports = { writerLog, saveLog };
