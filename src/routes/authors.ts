import express, { Request, Response } from 'express'
import { Author } from '../models/Author'

const authorRouter = express.Router()

authorRouter.get('/authors', async (req: Request, res: Response) => {

    try {
        const authers: Author[] = await Author.query()
        res.status(200).send(authers)
    } catch (error) {
        console.log('failed to fetch:', error)
    }

})

authorRouter.get('/authors/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const book: Author | undefined = await Author.query().findById(id)
        res.status(200).send(book)
    } catch (error) {
        console.log('failed to fetch:', error)
    }

})

authorRouter.post('/authors', async (req: Request, res: Response) => {
    const { name } = req.body

    try {
        const createdAuthor = await Author.query().insert({name})
        res.status(201).json(createdAuthor)
    } catch (error) {
        console.log('failed to fetch:', error)

        res.status(400).json(error)
    }

})


export { authorRouter }


