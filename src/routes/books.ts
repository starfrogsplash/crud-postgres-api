import express, { Request, Response } from 'express'
import { Book } from '../models/Book'
import { Author } from '../models/Author'
import { Authors_Books } from '../models/Authors_Books'

const bookRouter = express.Router()

bookRouter.get('/books', async (req: Request, res: Response) => {

    try {
        const books: Book[] = await Book.query()
        res.status(200).send(books)
    } catch (error) {
        console.log('failed to fetch:', error)
    }

})

bookRouter.get('/books/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const book: Book | undefined = await Book.query().findById(id)
        if(book){
           return res.status(200).send(book)
        } else{
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
        if(author_id){
            const findAuthor = await Author.query().findById(author_id)
            if(findAuthor){
                createdBook = await Book.query().insert({name})
            } else {
                return res.status(400).json('author not found')
            }
           
        }else{
           return res.status(400).json('please provide author id')
        }
  
    } catch (error) {
        console.log('failed to fetch:', error)
        res.status(401).json(error)
    }

    try {
        const authorBook = await Authors_Books.query().insert({author_id, book_id: createdBook?.id})
        res.status(201).json(authorBook)
    } catch (error) {
        console.log('failed to fetch:', error)
        res.status(400).json(error)
    }


})


export { bookRouter }


