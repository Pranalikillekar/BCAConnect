// backend/config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // your MySQL username
  password: 'root1', // your MySQL password
  database: 'bcaconnect' // your database name
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL Database');
});

module.exports = connection;
