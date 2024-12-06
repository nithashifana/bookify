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

router.get("/get", authMiddleware, getUser); 
router.put("/update", authMiddleware, updateUser); 
router.delete("/delete", authMiddleware, deleteUser); 

module.exports = router;