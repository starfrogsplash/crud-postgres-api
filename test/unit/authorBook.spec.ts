import {insertAuthorBook} from '../../src/controllers/AuthorBooks'
import {Authors_Books} from '../../src/models/Authors_Books'

describe('tests authorBook controller', () => {
    const mockedAuthors_Books = jest.spyOn(Authors_Books, 'query')
    const insert = jest.fn()

    afterEach(() => {
        jest.resetAllMocks()
      })

    it('returns valid author book relation', async() => {
        const dataRecord = {author_id: '1', book_id: '2'}
        insert.mockResolvedValue(dataRecord)
        //@ts-ignore
        mockedAuthors_Books.mockReturnValue({insert})
        const authorBookRelation = await insertAuthorBook('1', '2')
        expect(authorBookRelation).toEqual(dataRecord)
    })

})
