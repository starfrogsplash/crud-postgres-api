import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('books', (table) => {
        table.increments('id').primary().unique()
        table.string('name').notNullable()
      }).createTable('authors', (table) => {
        table.increments('id').primary().unique()
        table.string('name').notNullable()
      }).createTable('authors_books', (table) => {
        table.integer('author_id').unsigned().references('authors.id')
        table.integer('book_id').unsigned().references('books.id')
      })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('authors_books').dropTable('books').dropTable('authors')
}

