const path = require('path');
const config = require('dotenv').config({ path : path.join(__dirname, '..', '..', '.env') }).parsed;

module.exports = {
  "development": {
    "username": config.DB_USER,
    "password": config.DB_PASSWORD,
    "database": config.DB_NAME,
    "host": config.DB_HOST,
    "dialect": "postgres"
  }
};
