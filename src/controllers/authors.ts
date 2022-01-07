import { Author } from '../models/Author'

const getAllAuthors = async() => {
    try {
        const authors: Author[] = await Author.query()
        return authors
    } catch (error) {
        console.log('failed to fetch:', error)
    }
}

const getAuthorById = async(authorId: string) => {
    try {
        const author: Author | undefined = await Author.query().findById(authorId)
        return author
    } catch (error) {
        console.log('failed to fetch:', error)
    }
}

const insertAuthor = async(name: string) => {
    try {
        const createdAuthor= await Author.query().insert({name})
        return createdAuthor
    } catch (error) {
        console.log('failed to fetch:', error)
    }
}

export {
    getAllAuthors,
    getAuthorById,
    insertAuthor
}