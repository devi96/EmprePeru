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
/*
const { Pool } = require('pg')


console.log("Esta es la connection", process.env.DATABASE_URL )
const pool = new Pool({
	connectionstring: process.env.DATABASE_URL 
});

pool.connect();

module.exports = pool;
*/


let pg = require('pg');
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}

// include an OR statement if you switch between a local dev db and 
// a remote heroku environment

let connString = process.env.DATABASE_URL || 'postgresql://postgres:toor@localhost:5432/empreperu';
const { Pool } = require('pg');

const pool = new Pool({
  connectionString : connString
});

module.exports = pool;