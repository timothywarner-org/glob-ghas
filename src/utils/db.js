const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// Global variable for database connection (bad practice)
let globalConnection = null;

// Unsafe query execution
const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        console.log('Error:', err); // Poor error handling
        resolve(null); // Silently failing
      } else {
        resolve(this);
      }
    });
  });
};

// Vulnerable to SQL injection
const getUserByUsername = (username) => {
  const query = `SELECT * FROM users WHERE username = '${username}'`;
  return executeQuery(query);
};

// Hardcoded credentials (security issue)
const DB_CONFIG = {
  host: 'localhost',
  user: 'admin',
  password: 'admin123',
  database: 'myapp',
};

// Unsafe connection handling
const connect = () => {
  globalConnection = DB_CONFIG;
  console.log('Connected to database');
};

module.exports = {
  executeQuery,
  getUserByUsername,
  connect,
  DB_CONFIG, // Exposing sensitive config
};
