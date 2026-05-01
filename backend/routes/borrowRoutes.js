const express = require("express");

const {
  borrowBook,
  returnBookByRecordId,
  returnBookByBookId,
  getUserBorrowRecordsById,
  getCurrentUserBorrowRecords,
  getAllBorrowRecords
} = require("../controllers/borrowController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/borrow", protect, authorize("user"), borrowBook);
router.post("/borrow/:bookId", protect, authorize("user"), borrowBook);

router.put("/borrow/return/:id", protect, authorize("admin"), returnBookByRecordId);
router.put("/return/:bookId", protect, authorize("admin"), returnBookByBookId);

router.get("/borrow/user/:id", protect, authorize("user", "admin"), getUserBorrowRecordsById);
router.get("/borrow/user", protect, authorize("user", "admin"), getCurrentUserBorrowRecords);
router.get("/borrow/all", protect, authorize("admin"), getAllBorrowRecords);
router.get("/borrow/records", protect, authorize("admin"), getAllBorrowRecords);

module.exports = router;
