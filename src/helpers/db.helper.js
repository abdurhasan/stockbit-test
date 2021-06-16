const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
};

let connection;
async function getConnection() {
  if (!connection) {
    connection = await mysql.createPool(dbConfig);
  }

  return connection;
}

module.exports = { dbConfig, getConnection }