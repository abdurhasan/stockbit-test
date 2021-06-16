const moment = require('moment');
const { getConnection } = require('../helpers/db.helper');

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DEFAULT_LIMIT = 20;
const DEFAULT_SKIP = 1;

function LogSchema(payload) {
  const id = payload.id ? payload.id : null;
  const requestUrl = payload.requestUrl ? payload.requestUrl : null;
  const requestAt = payload.requestAt ? payload.requestAt : null;
  const responseTime = Number(payload.responseTime) ? `${(payload.responseTime) / 1000} seconds` : null;
  return {
    id,
    requestUrl,
    requestAt,
    responseTime
  };
}

class LogModel {
  constructor() {
    this.limit = DEFAULT_LIMIT;
    this.skip = DEFAULT_SKIP;
    this.requestUrl = null;
    this.requestAt = null;
    this.responseTime = null;
  }

  async getLogs(limit, skip) {
    if (Number(limit)) {
      this.limit = Number(limit) ? limit : this.limit;
    }
    if (Number(skip)) {
      this.skip = Number(skip) ? skip : this.skip;
    }

    const data = [];
    let total = 0;

    const runner = await getConnection();
    const [rows] = await runner.execute('SELECT * , (SELECT count(*) FROM log) AS total FROM log LIMIT ? OFFSET ?', [this.limit, this.skip]);

    for (let index = 0; index < rows.length; index += 1) {
      const tempLog = LogSchema(rows[index]);

      data.push(tempLog);
      if (index === 0) {
        total = rows[0].total || 0;
      }
    }

    return { data, total };
  }

  async createLog(requestUrl, requestAt, responseTime) {
    this.requestUrl = requestUrl;
    this.requestAt = moment(requestAt).isValid()
      ? moment(requestAt).utc().format(DATE_FORMAT)
      : moment().format(DATE_FORMAT);
    this.responseTime = responseTime;

    if (this.requestUrl && this.requestAt && this.responseTime) {
      const runner = await getConnection();
      const sql = 'INSERT INTO log (requestUrl,requestAt,responseTime) VALUES (?,?,?)';
      await runner.execute(sql, [this.requestUrl, this.requestAt, this.responseTime]);
    }
  }
}

const logModel = new LogModel();

module.exports = { logModel };
