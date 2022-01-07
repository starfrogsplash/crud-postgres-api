import { Authors_Books } from '../models/Authors_Books'

const insertAuthorBook = async(author_id: string, book_id: string | undefined):Promise<Authors_Books | undefined> => {
    try {
        const authorBook = await Authors_Books.query().insert({author_id, book_id})
        return authorBook
    } catch (error) {
        console.log('failed to fetch:', error)
    }
}

export {
    insertAuthorBook
}