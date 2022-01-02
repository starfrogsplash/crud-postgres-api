import { Model, ModelObject } from 'objection'

export class Book extends Model {
  id!: string
  name!: string
  author!: string

  static tableName = 'book' // database table name
  static idColumn = 'id' // id column name

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'name', 'author'],

      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        author: { type: 'string' },
      }
    };
  }
}

export type BookShape = ModelObject<Book>