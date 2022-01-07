import { getAllAuthors, getAuthorById, insertAuthor } from '../../src/controllers/Authors'
import { Author } from '../../src/models/Author'

describe('unit test for authors', () => {
  const mockedAuthor = jest.spyOn(Author, 'query')
  const insert = jest.fn();
  const findById = jest.fn();

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetch authors', async() => {
    const author1 = Author.fromJson({ name: 'George RR Martin', id:1 })
    const author2 = Author.fromJson({ name: 'R.L Stein', id:2 })
    const resultFromDB = [author1, author2]

    mockedAuthor.mockResolvedValue(resultFromDB)

    const fetchBooks = await getAllAuthors()
    expect(fetchBooks).toEqual(resultFromDB)
  })

  it('insert book', async() => {
    const resultFromDB = { name: 'R.L Stein', id: 1 }
    insert.mockResolvedValue(resultFromDB)
    //@ts-ignore
    mockedAuthor.mockReturnValue({insert})
    const insertAuthorToDB = await insertAuthor('R.L Stein')
    expect(insertAuthorToDB).toEqual(resultFromDB)
  })

  it('find book by Id', async() => {
    const resultFromDB = { name: 'George RR Martin', id: 2 }
    findById.mockResolvedValue(resultFromDB)
    //@ts-ignore
    mockedAuthor.mockReturnValue({findById})
    const fetchAuthorById = await getAuthorById('2')
    expect(fetchAuthorById).toEqual(resultFromDB)
  })
})


