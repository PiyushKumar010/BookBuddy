import Book from '../models/book.model.js';
import mongoose from 'mongoose';

// Get all books (public)
export const getAllBooks = async (req, res) => {
  try {
    // Populate user name for frontend display
    const books = await Book.find().populate('user', 'name');
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
}


// Add a new book for the logged-in user

export const addBook = async (req, res) => {
  const book = req.body;

  if (!book.title || !book.description || !book.image || !book.nameAuthor || book.price === undefined || !book.category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newBook = new Book({
      ...book,
      user: req.user._id,
      category: book.category,
  });

  try {
    await newBook.save();
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Update a book by its ID
export const updateBook =  async (req, res) => {
  const { id } = req.params;

  const book = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID' });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, book, {new: true});
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message:"Server Error" });
  }
 }

// Delete a book by its ID (only if it belongs to the user)
export const deleteBook =  async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: 'Invalid book ID' });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found' });
    }
    if (String(book.user) !== String(req.user._id)) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    await Book.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.log("error in deleting Book:", error.message);
    res.status(500).json({ success: false, message:"Server Error" });
  }

}



