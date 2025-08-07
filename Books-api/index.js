const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory book list
let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: 'Harry Potter', author: 'J.K. Rowling' }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET book by ID
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

// POST create new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  books[bookIndex] = { id, title, author };
  res.json(books[bookIndex]);
});

// DELETE book by ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`📚 Books API is running at http://localhost:${PORT}`);
});