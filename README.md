# CRUD API

A crud api which has many to many relationship model built using:
TypeScript, jest, knex, objection postgres, Docker

![Screenshot 2022-01-08 at 01 50 48](https://user-images.githubusercontent.com/22579826/148626963-f8cc4d23-a5fd-4275-b811-ad5649a4c80c.png)


## Installation

- [docker](https://docs.docker.com/get-docker/) to install foobar.

- [Node](https://nodejs.org/en/download/) to install foobar.


### Instructions


To spin up docker databases
```
docker-compose up
```

then 
```
# install dependencies for the app
npm install
```

```
# initialize the schema

npm migrateUp
```

###
to start the app
###
```
npm start
```

###
Swagger UI docs
###
```
http://localhost:3000/api-docs
```
