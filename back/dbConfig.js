const fs = require("fs");

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require("mysql2/promise");

const connectToDatabase = async () => {
    const connection = await mysql.createConnection({
        host:conf.host,
        user:conf.user,
        password:conf.password,
        port:conf.port,
        database:conf.database
    });
  
    return connection;
  }
  
  module.exports = connectToDatabase;
// const pool = mysql.createPool({
//     host:conf.host,
//     user:conf.user,
//     password:conf.password,
//     port:conf.port,
//     database:conf.database
// });



// module.exports = connection;