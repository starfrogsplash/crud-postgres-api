import express from 'express'
import { json } from 'body-parser'
import { userRouter } from './routes/users'

const app = express()

app.use(json())
app.use(userRouter)

export { app }


