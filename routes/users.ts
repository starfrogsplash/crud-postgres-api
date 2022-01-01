import express, {Request, Response} from 'express'

const router = express.Router()

router.get('/users', (req: Request, res: Response) => {
    res.status(200).send('list of users')
} )

router.post('/user', (req: Request, res: Response) => {
    const {username} = req.body
    res.status(201).json({message: `${username} created`})
})


export {router as userRouter}


