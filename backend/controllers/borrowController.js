const Book = require("../models/Book");
const Borrow = require("../models/Borrow");
const asyncHandler = require("../middleware/asyncHandler");

const buildDueDate = () => {
  const borrowDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(borrowDate.getDate() + Number(process.env.BORROW_DAYS || 14));
  return { borrowDate, dueDate };
};

const getEffectiveQuantity = (book) => {
  if (typeof book.quantity === "number") {
    return book.quantity;
  }
  return book.availabilityStatus === "Available" ? 1 : 0;
};

const borrowBook = asyncHandler(async (req, res) => {
  const bookId = req.body.bookId || req.params.bookId;
  if (!bookId) {
    res.status(400);
    throw new Error("bookId is required");
  }

  const book = await Book.findById(bookId);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  const effectiveQuantity = getEffectiveQuantity(book);
  if (effectiveQuantity <= 0) {
    res.status(400);
    throw new Error("Out of Stock");
  }

  const activeBorrow = await Borrow.findOne({
    userId: req.user._id,
    bookId: book._id,
    status: "Borrowed"
  });

  if (activeBorrow) {
    res.status(400);
    throw new Error("You already borrowed this book and have not returned it");
  }

  const { borrowDate, dueDate } = buildDueDate();

  const record = await Borrow.create({
    userId: req.user._id,
    userName: req.user.name,
    userEmail: req.user.email,
    bookId: book._id,
    bookTitle: book.title,
    borrowDate,
    dueDate,
    status: "Borrowed"
  });

  book.quantity = Math.max(0, effectiveQuantity - 1);
  book.availabilityStatus = book.quantity > 0 ? "Available" : "Borrowed";
  await book.save();

  res.status(201).json(record);
});

const returnBookByRecordId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const record = await Borrow.findById(id);
  if (!record) {
    res.status(404);
    throw new Error("Borrow record not found");
  }

  if (record.status === "Returned") {
    res.status(400);
    throw new Error("This record is already returned");
  }

  record.status = "Returned";
  record.returnDate = new Date();
  await record.save();

  const book = await Book.findById(record.bookId);
  if (book) {
    book.quantity = (book.quantity || 0) + 1;
    book.availabilityStatus = book.quantity > 0 ? "Available" : "Borrowed";
    await book.save();
  }

  res.status(200).json({ message: "Book returned successfully", record });
});

const returnBookByBookId = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const activeRecord = await Borrow.findOne({
    bookId,
    status: "Borrowed"
  }).sort({ borrowDate: 1 });

  if (!activeRecord) {
    res.status(400);
    throw new Error("No active borrow record found for this book");
  }

  req.params.id = String(activeRecord._id);
  return returnBookByRecordId(req, res);
});

const getUserBorrowRecordsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== "admin" && String(req.user._id) !== String(id)) {
    res.status(403);
    throw new Error("Not authorized to view these records");
  }

  const records = await Borrow.find({ userId: id }).sort({ createdAt: -1 });
  res.status(200).json(records);
});

const getCurrentUserBorrowRecords = asyncHandler(async (req, res) => {
  const records = await Borrow.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(records);
});

const getAllBorrowRecords = asyncHandler(async (req, res) => {
  const records = await Borrow.find({}).sort({ createdAt: -1 });
  res.status(200).json(records);
});

module.exports = {
  borrowBook,
  returnBookByRecordId,
  returnBookByBookId,
  getUserBorrowRecordsById,
  getCurrentUserBorrowRecords,
  getAllBorrowRecords
};
