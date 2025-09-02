NAME:Edwin Azasu Makafui
CONTACT: azasuedwin20@gmail.com


📚 Book Tracker API Project
🎯 Goal
Build a simple Book Tracker API using Node.js and Express that supports CRUD operations.
📌 Project Requirements
Each book should have:
- id (number)
- title (string)
- author (string)
- year (number)
- completed (boolean, whether the book was read or not)
Example:
{
  "id": 1,
  "title": "Atomic Habits",
  "author": "James Clear",
  "year": 2018,
  "completed": false
}
### API Endpoints
1. GET /books → Get all books
2. GET /books/:id → Get book by ID
3. POST /books → Add a new book
4. PUT /books/:id → Update a book
5. DELETE /books/:id → Delete a book
📝 Example Implementation (In-Memory)

const express = require('express');
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", year: 2018, completed: false },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", year: 2008, completed: true }
];

app.get('/books', (req, res) => {
  res.json({ success: true, data: books });
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ success: false, message: "Book not found" });
  res.json({ success: true, data: book });
});

app.post('/books', (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  const newBook = { id: books.length + 1, title, author, year, completed: false };
  books.push(newBook);
  res.status(201).json({ success: true, data: newBook });
});


const PORT = 3000;
app.listen(PORT, () => console.log(`Book Tracker API running on http://localhost:${PORT}`));

✅ Assignment
    1. Add a GET /books/completed endpoint → returns only completed books.
    2. Add validation so a book’s year must be greater than 1900.
    3. Add a search feature → GET /books/search?title=atomic should return books matching the word.
    4. Add a createdAt field when a book is added.
    5. Add a PUT /books/:id endpoint →  edits a book by the ID and returns a response whether the operation was successful or not.
    6. Add a DELETE /books/:id endpoint → Delete’s a book by the ID and returns a response whether the operation was successful or not.
    7. (Optional) Use SQLite instead of in-memory storage to persist data.
