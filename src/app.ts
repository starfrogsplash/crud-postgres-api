import express from 'express'
import { json } from 'body-parser'
import { bookRouter } from './routes/books'
import { authorRouter } from './routes/authors'

const app = express()

app.use(json())
app.use(bookRouter)
app.use(authorRouter)

export { app }


