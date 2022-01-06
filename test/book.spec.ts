import request from 'supertest'
import Knex from 'knex'
import { Model } from 'objection'
import { globalSetUp } from './global-setup'

import { app } from '../src/app'

describe('books', () => {
  let knex: any
  let seededBooks: any
  let seededAuthors: any
  let seededBookAuthorRelationship: any

  beforeAll(async () => {

    await globalSetUp()

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

    // Seed anything
    seededBooks = await knex('books')
      .insert([{ name: 'A Game of Thrones' }, { name: 'Winds of winter' }, { name: 'Witcher: volume 1' }])
      .returning('*')
    seededAuthors = await knex('authors')
      .insert([{ name: 'George RR Martin' }, { name: 'Andrzej Sapkowski' }])
      .returning('*')
    seededBookAuthorRelationship = await knex('authors_books')
      .insert([{ author_id: 1, book_id: 1 }, { author_id: 1, book_id: 2 }, { author_id: 2, book_id: 3 }])
      .returning('*')

  })

  afterAll(() => {
    knex.destroy()
  })

  describe('GET /books', () => {
    it('should return list of books', async () => {
      const { body: books } = await request(app).get(`/books`).expect(200)
      expect(books.length).toEqual(3)
    })

    it('should return a book by id', async () => {
      const { body: book } = await request(app).get(`/books/1`).expect(200)
      expect(book.name).toEqual('A Game of Thrones')
    })

    it('should return a book by id', async () => {
      const { status } = await request(app).get(`/books/20`)
      expect(status).toEqual(404)
    })


  })
})