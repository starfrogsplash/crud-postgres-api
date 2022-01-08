import express, { Request, Response } from 'express'
import { getAllBooks, getBookById, insertBook } from '../controllers/Books'
import { getAuthorById } from '../controllers/Authors'
import { insertAuthorBook } from '../controllers/AuthorBooks'

/**
@swagger
* components:
*     schemas:
*       Book:
*         type: object
*         required:
*           - title
*           - author
*           - finished
*         properties:
*           id:
*             type: integer
*             description: The auto-generated id of the book.
*           title:
*             type: string
*             description: The title of your book.
*           author:
*             type: string
*             description: Who wrote the book?
*           finished:
*             type: boolean
*             description: Have you finished reading it?
*           createdAt:
*             type: string
*             format: date
*             description: The date of the record creation.
*         example:
*            title: The Pragmatic Programmer
*            author: Andy Hunt / Dave Thomas
*            finished: true
*/

/** 
 *@swagger
 *  tags:
 *    name: Books
 *    description: API to manage your books.
 */

/**
 * @swagger
 *  /books:
 *    post:
 *      summary: Creates a new book
 *      tags: [Books]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      responses:
 *        "200":
 *          description: The created book.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Book'
 *    get:
 *      summary: Lists all the books
 *      tags: [Books]
 *      responses:
 *        "200":
 *          description: The list of books.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Book'
 * /books/{id}:
 *    get:
 *      summary: get book by id
 *      tags: [Books]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The book id
 *      responses:
 *        "200":
 *          description: The list of books.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Book'
 */

const bookRouter = express.Router()

bookRouter.get('/books', async (req: Request, res: Response) => {
    try {
        const books = await getAllBooks()
        res.status(200).send(books)
    } catch (error) {
        console.log('failed to fetch:', error)
    }
})

bookRouter.get('/books/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const book = await getBookById(id)
        if (book) {
            return res.status(200).send(book)
        } else {
            return res.status(404).json('book not found')
        }
    } catch (error) {
        console.log('failed to fetch:', error)
    }
})

bookRouter.post('/books', async (req: Request, res: Response) => {
    const { name, author_id } = req.body
    let createdBook = null

    try {
        if (author_id) {
            const findAuthor = await getAuthorById(author_id)
            if (findAuthor) {
                createdBook = await insertBook(name)
            } else {
                return res.status(400).json('author not found')
            }
        } else {
            return res.status(400).json('please provide author id')
        }

    } catch (error) {
        console.log('failed to fetch:', error)
        res.status(401).json(error)
    }

    try {
        const authorBook = await insertAuthorBook(author_id, createdBook?.id)
        res.status(201).json(authorBook)
    } catch (error) {
        console.log('failed to fetch:', error)
        res.status(400).json(error)
    }
})


export { bookRouter }


