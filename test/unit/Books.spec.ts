import { getAllBooks,getBookById, insertBook } from '../../src/controllers/Books'
import { Book } from '../../src/models/Book'

describe('unit test for books', () => {
  const mockedBook = jest.spyOn(Book, 'query')
  const insert = jest.fn();
  const findById = jest.fn();

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetch books', async() => {
    const book1 = Book.fromJson({ name: 'planet', id:1 })
    const book2 = Book.fromJson({ name: 'jimmyasdasd', id:2 })
    const resultFromDB = [book1, book2]

    mockedBook.mockResolvedValue(resultFromDB)

    const fetchBooks = await getAllBooks()
    expect(fetchBooks).toEqual(resultFromDB)
  })

  it('insert book', async() => {
    const resultFromDB = { name: 'apple', id: 1 }
    insert.mockResolvedValue(resultFromDB)
    //@ts-ignore
    mockedBook.mockReturnValue({insert})
    const insertBookToDB = await insertBook('apple')
    expect(insertBookToDB).toEqual(resultFromDB)
  })

  it('find book by Id', async() => {
    const resultFromDB = { name: 'Game of thrones', id: 2 }
    findById.mockResolvedValue(resultFromDB)
    //@ts-ignore
    mockedBook.mockReturnValue({findById})
    const fetchBookById = await getBookById('2')
    expect(fetchBookById).toEqual(resultFromDB)
  })
})


