import Knex from 'knex'

const database = '"docker-dbTest"'

// Create the database
const createTestDatabase = async() => {
  const knex = Knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        database: undefined,
        port: 5400,
        password: 'dbTestPass',
        user: 'dbTestUser'
    },
  })
  console.log('database==', database)
  console.log(`DROP DATABASE IF EXISTS ${database}`)

  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${database}`)
    console.log(`DROP DATABASE IF EXISTS ${database}`)
    await knex.raw(`CREATE DATABASE ${database}`)
  } catch (err: any) {
    console.log(err)
    throw new Error(err)
  } finally {
    await knex.destroy()
  }
}

// Seed the database with schema and data
async function migrateTestDatabase() {
    const knex = Knex({
      client: 'pg',
      connection: {
        host: 'localhost',
        database: 'docker-dbTest',
        port: 5400,
        password: 'dbTestPass',
        user: 'dbTestUser'
      },
    })
  
    try {
      await knex.migrate.latest()
      // await knex.seed.run()
    } catch (err: any) {
      throw new Error(err)
    } finally {
      await knex.destroy()
    }
  }


  const globalSetUp = async()=> {
    try {
      await createTestDatabase()
      await migrateTestDatabase()
      console.log('Test database created successfully')
    } catch (error) {
      console.log(error)
      process.exit(1)
    }

  }

  export {
    globalSetUp
  }