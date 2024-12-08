const express = require("express");
const {
  addBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware"); 

const router = express.Router();

router.post("/add", authMiddleware, addBook);
router.get("/gets", getBooks);
router.get("/:id", getBook);
router.put("/update/:id", authMiddleware, updateBook);
router.delete("/delete/:id", authMiddleware, deleteBook);

module.exports = router;