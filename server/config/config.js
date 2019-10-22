const fs = require("fs");

module.exports = {
  development: {
    username: "root",
    password: "sqlPass",
    database: "prices_dev",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "sqlPass",
    database: "prices_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "mysql"
  }
};
