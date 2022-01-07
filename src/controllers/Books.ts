import { Book } from '../models/Book'


const getAllBooks = async():Promise<Book[] | undefined> => {
    try {
        const books: Book[] = await Book.query()
        return books
    } catch (error) {
        console.log('failed to fetch:', error)
    }
}

const getBookById = async(bookId: string): Promise<Book | undefined> => {
    try {
        const book: Book | undefined = await Book.query().findById(bookId)
        return book
    } catch (error) {
        console.log('failed to fetch:', error)
    }
}

const insertBook = async(name: string): Promise<Book | undefined> => {
    try {
        const createdBook = await Book.query().insert({name})
        return createdBook
    } catch (error) {
        console.log('failed to fetch:', error)
    }
}

export {
    getAllBooks,
    getBookById,
    insertBook
}