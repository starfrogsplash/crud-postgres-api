import express, { Request, Response } from 'express'
import { getAllBooks, getBookById, insertBook } from '../controllers/Books'
import { getAuthorById } from '../controllers/Authors'
import { insertAuthorBook } from '../controllers/AuthorBooks'

const bookRouter = express.Router()

bookRouter.get('/books', async (req: Request, res: Response) => {
    try {
        const books = await getAllBooks()
        res.status(200).send(books)
    } catch (error) {
        console.log('failed to fetch:', error)
        res.status(500).send('internal error')
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


