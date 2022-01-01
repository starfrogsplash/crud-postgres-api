import request from 'supertest'
import { app } from '../app'

it('returns list of users from /users endpoint', async () => {

    const response = await request(app).get('/users')

    expect(response.status).toEqual(200)
    expect(response.text).toEqual('list of users')
})

it('returns a success with user created, /users endpoint', async () => {

    const response = await request(app)
        .post('/user')
        .send({username: 'JimmyJack'})

    expect(response.status).toEqual(201)
    expect(response.body).toEqual({"message": "JimmyJack created"})
})

