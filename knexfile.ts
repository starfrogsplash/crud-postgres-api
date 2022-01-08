// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      database: 'docker-db',
      port: 5432,
      password: process.env.DB_PASS,
      user: process.env.DB_USER,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './migrations'
    }
  },

};
