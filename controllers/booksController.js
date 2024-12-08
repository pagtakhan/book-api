const books = require('../models/booksModel');

// Get all books
const getAllBooks = (req, res) => {
  res.json(books);
};

// Get a book by ID
const getBookById = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
};

// Create a new book
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

// Update a book
const updateBook = (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  book.title = req.body.title;
  book.author = req.body.author;
  book.genre = req.body.genre;
  book.publicationDate = req.body.publicationDate;

  res.json(book);
};

// Delete a book
const deleteBook = (req, res) => {
  const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status .status(404).send('Book not found');

  books.splice(bookIndex, 1);
  res.status(204).send();
};

// Get books by genre
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