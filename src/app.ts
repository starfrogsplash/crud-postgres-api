require('dotenv').config()
import express from 'express'
import { json } from 'body-parser'
import { userRouter } from './routes/users'
import Knex from 'knex'
import { Model } from 'objection'

const knex = Knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: 'docker-db',
    port: 5432,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
  },
})

// Connect database to Objection
Model.knex(knex)

const connectionTest = async () => {
  try {
    const connection = await knex.raw("SELECT 1 + 1");
    console.log(connection.rows);
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};

connectionTest();

const app = express()

app.use(json())
app.use(userRouter)

export { app }


