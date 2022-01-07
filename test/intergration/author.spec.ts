import request from 'supertest'
import { app } from '../src/app'
import { globalSetUp } from './global-setup'

describe('authors', () => {

  let knex: any

  const database = 'authorDB'
    beforeAll(async () => {
      knex = await globalSetUp(database)
    })

    afterAll(() => {
      knex.destroy()
    })

  describe('GET /authors', () => {
    it('should return list of authors', async () => {
      const { body: books, status } = await request(app).get(`/authors`)
      expect(books.length).toEqual(2)
      expect(status).toEqual(200)
    })

    it('should return a author of id', async () => {
      const { body: author, status } = await request(app).get(`/authors/1`)
      expect(author.name).toEqual('George RR Martin')
      expect(status).toEqual(200)
    })

    it('should not return an author book', async () => {
      const { status } = await request(app).get(`/authors/20`)
      expect(status).toEqual(404)
    })


  })
})