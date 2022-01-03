import { Model, ModelObject } from 'objection'

export class Author extends Model {
  id!: string
  name!: string

  static idColumn = 'id' // id column name
  static tableName = 'authors' // database table name
}

export type AuthorShape = ModelObject<Author>