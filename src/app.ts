import express from 'express'
import { json } from 'body-parser'
import {userRouter} from './routes/users'
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('docker-db', 'dbUser', 'dbPass', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      // match: [Sequelize],
      max: 3
    }
  });

  const connectionTest = async () => {
    try {
      await sequelize.authenticate();
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


