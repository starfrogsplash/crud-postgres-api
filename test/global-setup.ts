import Knex from 'knex'
import { Model } from 'objection'

const database = '"docker-dbTest"'

let knex: any

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
    } catch (err: any) {
      throw new Error(err)
    } finally {
      await knex.destroy()
    }
  }

  const seedDataBase = async (knex: any) => {
     const seededBooks = await knex('books')
        .insert([{ name: 'A Game of Thrones' }, { name: 'Winds of winter' }, { name: 'Witcher: volume 1' }])
        .returning('*')
      const seededAuthors = await knex('authors')
        .insert([{ name: 'George RR Martin' }, { name: 'Andrzej Sapkowski' }])
        .returning('*')
      const seededBookAuthorRelationship = await knex('authors_books')
        .insert([{ author_id: 1, book_id: 1 }, { author_id: 1, book_id: 2 }, { author_id: 2, book_id: 3 }])
        .returning('*')
  }

  const globalSetUp = async()=> {
    try {
      await createTestDatabase()
      await migrateTestDatabase()
      console.log('Test database created successfully')

      knex = Knex({
        client: 'pg',
        connection: {
          host: 'localhost',
          database: 'docker-dbTest',
          port: 5400,
          password: 'dbTestPass',
          user: 'dbTestUser'
        },
      })
      Model.knex(knex)

      await seedDataBase(knex)
  
      return knex

    } catch (error) {
      console.log(error)
      process.exit(1)
    }

  }

  export {
    globalSetUp
  }