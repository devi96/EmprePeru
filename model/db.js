/*const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database on port", dbConfig.PORT );
});

module.exports = connection;
*/

const {pool} =require('pg')
const pool = new Pool({
	connectionstring: process.env.DATABASE_URL
	ssl:true
});

pool.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database");
});

module.exports = pool;