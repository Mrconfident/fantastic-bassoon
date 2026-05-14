const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
        success: false,
      });
    }

    const existingUser = User.findByUsername(username);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({ username, password: hashedPassword, role });
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", success: false });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
        success: false,
      });
    }

    const user = User.findByUsername(username);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid username or password", success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid username or password", success: false });
    }

    const token = jwt.sign(
      { id: user.id, email: user.username, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    res.json({ message: "Login successful", success: true, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", success: false });
  }
};

exports.logout = async (req, res) => {
  try {
    // In a real application, you would handle token invalidation here
    res.json({ message: "Logout successful", success: true });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", success: false });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.json({
      message: "User retrieved successfully",
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", success: false });
  }
};
