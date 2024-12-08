const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const JWT_TOKEN = process.env.JWT_TOKEN;

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_TOKEN, { expiresIn: "1h" });
};

const validateFields = (requiredFields, data) => {
  return requiredFields.every((field) => data[field]);
};

module.exports.registerUser = async (req, res) => {
  const { name, email, password, membershipType } = req.body;

  if (!validateFields(["name", "email", "password", "membershipType"], req.body)) {
    return res.status(400).json({ message: "All fields are mandatory." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email." });
    }

    const newUser = new User({
      name,
      email,
      password,
      membershipType,
      registeredDate: Date.now(),
    });

    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ message: "Account created successfully.", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!validateFields(["email", "password"], req.body)) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Account not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = generateToken(user._id);
    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const userId = req.user._id; 
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User fetched successfully.", user });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.updateUser = async (req, res) => {
  const { name, membershipType } = req.body;

  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (name) user.name = name;
    if (membershipType) user.membershipType = membershipType;

    await user.save();

    res.status(200).json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user._id; 
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};