const Book = require("../models/Book");
const asyncHandler = require("../middleware/asyncHandler");

const getBooks = asyncHandler(async (req, res) => {
  const { search = "" } = req.query;

  const query = {
    $or: [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } }
    ]
  };

  const books = await Book.find(search ? query : {}).sort({ createdAt: -1 });
  res.status(200).json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  res.status(200).json(book);
});

const createBook = asyncHandler(async (req, res) => {
  const { title, author, category, branch, year, description, availabilityStatus, quantity } = req.body;

  const safeQuantity = Number.isFinite(Number(quantity)) ? Number(quantity) : 1;

  const book = await Book.create({
    title,
    author,
    category,
    branch,
    year,
    description,
    quantity: safeQuantity,
    availabilityStatus: safeQuantity > 0 ? "Available" : "Borrowed"
  });

  res.status(201).json(book);
});

const updateBook = asyncHandler(async (req, res) => {
  const { title, author, category, branch, year, description, availabilityStatus, quantity } = req.body;

  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  book.title = title ?? book.title;
  book.author = author ?? book.author;
  book.category = category ?? book.category;
  book.branch = branch ?? book.branch;
  book.year = year ?? book.year;
  book.description = description ?? book.description;
  if (quantity !== undefined) {
    book.quantity = Math.max(0, Number(quantity) || 0);
    book.availabilityStatus = book.quantity > 0 ? "Available" : "Borrowed";
  } else {
    book.availabilityStatus = availabilityStatus ?? book.availabilityStatus;
  }

  const updatedBook = await book.save();
  res.status(200).json(updatedBook);
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  await book.deleteOne();
  res.status(200).json({ message: "Book deleted successfully" });
});

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
