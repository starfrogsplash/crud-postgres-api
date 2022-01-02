require('dotenv').config()
import { app } from './app'
import Knex from 'knex'
import { Model } from 'objection'

const port = 3000

const knex = Knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        database: 'docker-db',
        port: 5432,
        password: process.env.DB_PASS,
        user: process.env.DB_USER,
    },
    migrations: {
        directory: './migrations'
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

app.listen(port, () => { console.log('I am listening on port 3000') })
