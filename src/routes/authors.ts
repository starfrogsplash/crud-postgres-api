import express, { Request, Response } from 'express'
import { Author } from '../models/Author'

/**
@swagger
* components:
*     schemas:
*       Author:
*         type: object
*         required:
*           - author
*           - name
*         properties:
*           id:
*             type: integer
*             description: The auto-generated id of the author.
*           name:
*             type: string
*             description: Who wrote the book?
*         example:
*            name: Andy Hunt / Dave Thomas
*            id: 1
*/

/** 
 *@swagger
 *  tags:
 *    name: Authors
 *    description: API to manage your Author.
 */

/**
 * @swagger
 *  /authors:
 *    post:
 *      summary: Creates a new author
 *      tags: [Authors]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Author'
 *      responses:
 *        "200":
 *          description: The created book.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Author'
 *    get:
 *      summary: Lists all Authors
 *      tags: [Authors]
 *      responses:
 *        "200":
 *          description: The list of books.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Author'
 * /authors/{id}:
 *    get:
 *      summary: get author by id
 *      tags: [Authors]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: The author id
 *      responses:
 *        "200":
 *          description: return author
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Author'
 */

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
        const author: Author | undefined = await Author.query().findById(id)
        if(author){
            res.status(200).send(author)
        }else {
            res.status(404).send(author)
        }
 
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


