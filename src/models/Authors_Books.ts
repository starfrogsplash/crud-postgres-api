import { Model, ModelObject } from 'objection'

export class Authors_Books extends Model {
  book_id!: string
  author_id!: string

  static tableName = 'authors_books' // database table name
  static idColumn = ['book_id', 'author_id'] // id column name

}

export type BookShape = ModelObject<Authors_Books>