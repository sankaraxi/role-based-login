const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

// Register
const registerUser = (req, res) => {
  const { first_name, last_name, email, department, username, password, role } = req.body;

  if (!first_name || !last_name || !department || !username || !password || !role) {
    return res.status(400).send('All fields are required');
  }

  // Hashing Password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password');

    const query = 'INSERT INTO users (first_name, last_name, email, department, username, password, role) VALUES (?, ?, ?,?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, department, username, hashedPassword, role], (err, result) => {
      if (err) return res.status(500).send('Database error');
      res.status(201).send('User registered successfully');
    });
  });
};

// Login
const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(400).send('Invalid username or password');

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).send('Error comparing passwords');
      if (!isMatch) return res.status(400).send('Invalid username or password');

      // JWT token
      const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token, role: user.role });
    });
  });
};

module.exports = { registerUser, loginUser };
