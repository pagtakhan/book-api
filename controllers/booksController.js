const books = require('../models/booksModel');

const getAllBooks = (req, res) => {
  res.json(books);
};

const getBookById = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
};

const createBook = (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publicationDate: req.body.publicationDate,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

const updateBook = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  book.title = req.body.title;
  book.author = req.body.author;
  book.genre = req.body.genre;
  book.publicationDate = req.body.publicationDate;

  res.json(book);
};

const deleteBook = (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status .status(404).send('Book not found');

  books.splice(bookIndex, 1);
  res.status(204).send();
};

const getBooksByGenre = (req, res) => {
  const genre = req.params.genre;
  const filteredBooks = books.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  res.json(filteredBooks);
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getBooksByGenre,
};