import { getBooks, insertBook } from '../../src/controllers/getBooks'
import { Book } from '../../src/models/Book'

describe('unit test', () => {
  const mockedBook = jest.spyOn(Book, 'query')
  const insert = jest.fn();

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetch books', async() => {
    const book1 = Book.fromJson({ name: 'planet', id:1 })
    const book2 = Book.fromJson({ name: 'jimmyasdasd', id:2 })
    const resultFromDB = [book1, book2]

    mockedBook.mockResolvedValue(resultFromDB)

    const fetchBooks = await getBooks()
    expect(fetchBooks).toEqual(resultFromDB)
  })

  it('insert book', async() => {
    const resultFromDB = { name: 'apple', id: 1 }
    insert.mockResolvedValue(resultFromDB)
    //@ts-ignore
    mockedBook.mockReturnValue({insert})
    const fetchBooks = await insertBook('apple')
    expect(fetchBooks).toEqual(resultFromDB)
  })


})


