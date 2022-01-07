import { Book } from '../models/Book'


const getBooks = async() => {
    try {
        const books: Book[] = await Book.query()
        return books
    } catch (error) {
        console.log('failed to fetch:', error)
    }
}

const insertBook = async(name: string) => {
    try {
        const createdBook = await Book.query().insert({name})
        return createdBook
    } catch (error) {
        console.log('failed to fetch:', error)
    }
}

export {
    getBooks,
    insertBook
}