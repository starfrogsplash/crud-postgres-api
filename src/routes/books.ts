import express, { Request, Response } from 'express'
import { Book } from '../models/Book'

const bookRouter = express.Router()

bookRouter.get('/books', async (req: Request, res: Response) => {

    try {
        const books: Book[] = await Book.query()
        res.status(200).send(books)
    } catch (error) {
        console.log('failed to fetch:', error)
    }

})

bookRouter.get('/books:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const book: Book | undefined = await Book.query().findById(id)
        res.status(200).send(book)
    } catch (error) {
        console.log('failed to fetch:', error)
    }

})

bookRouter.post('/books', async (req: Request, res: Response) => {
    const { username } = req.body

    res.status(201).json({ message: `${username} created` })
    try {
        const createBook = await Book.query().insert({
            id: 'abc12',
            name: 'windy path',
            author: "john"
        })
        res.status(200).send(createBook)
    } catch (error) {
        console.log('failed to fetch:', error)
    }

})


export { bookRouter }


