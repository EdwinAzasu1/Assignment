const express = require('express');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for books (in a real app, this would be a database)
let books = [
  { 
    id: 1, 
    title: "The Begining After The End", 
    author: "James Vladimir", 
    year: 2018, 
    completed: false, 
    createdAt: new Date('2025-01-15') 
  
  },
  { 
    id: 2, 
    title: "Clean Code", 
    author: "Khine Akira", 
    year: 2008, 
    completed: true, 
    createdAt: new Date('2024-02-20') 
  },

  { 
    id: 3, 
    title: "Saga of Tanya the Evil", 
    author: "Saori Metsubayashi", 
    year: 2008, 
    completed: true, 
    createdAt: new Date('2024-02-20') 
  }



];

// 1. GET /books → Get all books
app.get('/books', (req, res) => {
  // Return all books in the array
  res.json({ success: true, data: books });
});

// 2. GET /books/:id → Get book by ID
app.get('/books/:id', (req, res) => {
  // Extract and convert ID from URL parameter
  const id = parseInt(req.params.id);
  
  // Find book with matching ID
  const book = books.find(b => b.id === id);
  
  // If book not found, return 404 error
  if (!book) return res.status(404).json({ success: false, message: "Book not found" });
  
  // Return the found book
  res.json({ success: true, data: book });
});

// 3. POST /books → Add a new book
app.post('/books', (req, res) => {
  // Extract book details from request body
  const { title, author, year } = req.body;
  
  // Validation: Check if all required fields are provided
  if (!title || !author || !year) {
    return res.status(400).json({ success: false, message: "All fields (title, author, year) are required" });
  }
  
  // Validation: Check if year is valid (greater than 1900)
  if (year <= 1900) {
    return res.status(400).json({ success: false, message: "Year must be greater than 1900" });
  }
  
  // Generate a new ID (max existing ID + 1)
  const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
  
  // Create new book object with default values
  const newBook = { 
    id: newId, 
    title, 
    author, 
    year, 
    completed: false, // Default value for completed
    createdAt: new Date()  // Add current timestamp
  };
  
  // Add new book to the array
  books.push(newBook);
  
  // Return success response with the created book
  res.status(201).json({ success: true, data: newBook });
});

// 4. PUT /books/:id → Update a book
app.put('/books/:id', (req, res) => {
  // Extract and convert ID from URL parameter
  const id = parseInt(req.params.id);
  
  // Find index of book with matching ID
  const bookIndex = books.findIndex(b => b.id === id);
  
  // If book not found, return 404 error
  if (bookIndex === -1) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }
  
  // Extract update fields from request body
  const { title, author, year, completed } = req.body;
  
  // Validation: Check if year is valid (if provided)
  if (year && year <= 1900) {
    return res.status(400).json({ success: false, message: "Year must be greater than 1900" });
  }
  
  // Update the book with provided fields (only update provided fields)
  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;
  if (year) books[bookIndex].year = year;
  if (typeof completed !== 'undefined') books[bookIndex].completed = completed;
  
  // Return success response with updated book
  res.json({ success: true, data: books[bookIndex], message: "Book updated successfully" });
});

// 5. DELETE /books/:id → Delete a book
app.delete('/books/:id', (req, res) => {
  // Extract and convert ID from URL parameter
  const id = parseInt(req.params.id);
  
  // Find index of book with matching ID
  const bookIndex = books.findIndex(b => b.id === id);
  
  // If book not found, return 404 error
  if (bookIndex === -1) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }
  
  // Remove book from array
  books.splice(bookIndex, 1);
  
  // Return success response
  res.json({ success: true, message: "Book deleted successfully" });
});

// 6. GET /books/completed → returns only completed books
app.get('/books/completed', (req, res) => {
  // Filter books to only include completed ones
  const completedBooks = books.filter(book => book.completed === true);
  
  // Return filtered books
  res.json({ success: true, data: completedBooks });
});

// 7. GET /books/search → search books by title
app.get('/books/search', (req, res) => {
  // Extract search query from URL parameters
  const { title } = req.query;
  
  // Validation: Check if title query parameter is provided
  if (!title) {
    return res.status(400).json({ success: false, message: "Title query parameter is required" });
  }
  
  // Convert search term to lowercase for case-insensitive search
  const searchTerm = title.toLowerCase();
  
  // Filter books that contain the search term in their title
  const matchingBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm)
  );
  
  // Return matching books
  res.json({ success: true, data: matchingBooks });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Book Tracker API running on http://localhost:${PORT}`));