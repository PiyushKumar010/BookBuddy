import express from 'express';
const router = express.Router();
import { getAllBooks, addBook, updateBook, deleteBook } from '../controllers/book.controller.js';

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
	if (req.isAuthenticated && req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({ success: false, message: 'Unauthorized' });
}

// Route to get all books (public)
router.get('/', getAllBooks);

// Route to add a new book (protected)
router.post('/', isAuthenticated, addBook);

// Route to update a book by ID (protected)
router.put('/:id', isAuthenticated, updateBook);

// Route to delete a book by ID (protected)
router.delete('/:id', isAuthenticated, deleteBook);

export default router;