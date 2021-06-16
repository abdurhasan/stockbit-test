const { app } = require('./app');
// const mysql = require('mysql2/promise');


const port = process.env.PORT || 5000;
// let connection;

async function main() {
  // connection = await mysql.createPool(dbConfig);

  await app.listen(port);
  /* eslint-disable */    
  console.log(`app is listening on PORT : ${port}`);
}

main();
