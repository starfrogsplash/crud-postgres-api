import Knex from 'knex'

const database = 'test_book_database'

const knex = Knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        // database: 'docker-dbTest',
        port: 5432,
        password: 'dbTestPass',
        user: 'dbTestUser'
    },
  })

module.exports = async () => {
    try {
      await knex.raw(`DROP DATABASE IF EXISTS ${database}`)
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }