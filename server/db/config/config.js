const dotenv = require('dotenv');

dotenv.config();

const logQueries = process.env.NODE_ENV === 'production' && { logging: false };

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ...logQueries,
  },
  test: {
    username: 'fincare_admin',
    password: 'fincare_password',
    database: 'fincare_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    ...logQueries,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ...logQueries,
  },
  local: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    ...logQueries,
  },
};
