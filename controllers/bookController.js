const mongoose = require("mongoose");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

module.exports.addBook = async (req, res) => {
  try {
    const { title, author, publishedYear, genre, availableCopies } = req.body;

    if (!title || !author || !publishedYear || !genre || !availableCopies) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists." });
    }

    const newBook = new Book({
      title,
      author,
      publishedYear,
      genre,
      availableCopies,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully.", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ message: "Books fetched successfully.", books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports.getBook = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID." });
  }

  try {
    
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({ message: "Book fetched successfully.", book });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports.updateBook = async (req, res) => {
  const id = req.params.id;
  const { title, author, publishedYear, genre, availableCopies } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID." });
  }

  try {
    const book = await Book.findById(id);

    book.title = title || book.title;
    book.author = author || book.author;
    book.publishedYear = publishedYear || book.publishedYear;
    book.genre = genre || book.genre;
    book.availableCopies = availableCopies || book.availableCopies;

    await book.save();
    res.status(200).json({ message: "Book updated successfully.", book });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
  const id = req.params.id;
  console.log("Book ID:", id);

  const userId = req.user._id; 

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book ID." });
  }
    const user = await User.findById(userId);
    if (!user || !user.isAdmin) {
      console.log(user);
      console.log(user.isAdmin);
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const book = await Book.findByIdAndDelete(id);
    console.log("Book found:", book);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};