import express from 'express'
import { json } from 'body-parser'
import { bookRouter } from './routes/books'

const app = express()

app.use(json())
app.use(bookRouter)

export { app }


