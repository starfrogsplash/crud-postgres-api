import request from 'supertest'
import { app } from '../src/app'

describe('books', () => {

  describe('GET /books', () => {
    it('should return list of books', async () => {
      const { body: books, status } = await request(app).get(`/books`)
      expect(books.length).toEqual(3)
      expect(status).toEqual(200)
    })

    it('should return a book by id', async () => {
      const { body: book, status } = await request(app).get(`/books/1`)
      expect(book.name).toEqual('A Game of Thrones')
      expect(status).toEqual(200)
    })

    it('should return a book by id', async () => {
      const { status } = await request(app).get(`/books/20`)
      expect(status).toEqual(404)
    })


  })
})