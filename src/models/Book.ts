import { Model, ModelObject } from 'objection'

export class Book extends Model {
  id!: string
  name!: string

  static tableName = 'books' // database table name
  static idColumn = 'id' // id column name

}

export type BookShape = ModelObject<Book>