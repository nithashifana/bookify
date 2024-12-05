const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser); 

router.get("/profile", authMiddleware, getUser); 
router.put("/profile", authMiddleware, updateUser); 
router.delete("/profile", authMiddleware, deleteUser); 

module.exports = router;