import { globalSetUp } from "./global-setup"

let knex: any

beforeAll(async () => {
  knex = await globalSetUp()
})

afterAll(() => {
  knex.destroy()
})