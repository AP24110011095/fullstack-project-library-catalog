const express = require("express");
const { body } = require("express-validator");

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateMiddleware");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);

router.post(
  "/",
  protect,
  authorize("admin"),
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("author").trim().notEmpty().withMessage("Author is required"),
    body("category").trim().notEmpty().withMessage("Category is required"),
    body("branch").trim().notEmpty().withMessage("Branch is required"),
    body("year")
      .isInt({ min: 1, max: 8 })
      .withMessage("Year must be between 1 and 8"),
    body("quantity")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Quantity must be a non-negative integer"),
    body("description").trim().notEmpty().withMessage("Description is required")
  ],
  validateRequest,
  createBook
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  [
    body("availabilityStatus")
      .optional()
      .isIn(["Available", "Borrowed"])
      .withMessage("availabilityStatus must be Available or Borrowed"),
    body("quantity")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Quantity must be a non-negative integer")
  ],
  validateRequest,
  updateBook
);

router.delete("/:id", protect, authorize("admin"), deleteBook);

module.exports = router;
